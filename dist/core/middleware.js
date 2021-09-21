import { routeOption, getMatchedComponents, normalizePath } from '../utils';
export default async function authMiddleware(ctx) {
    // Disable middleware if options: { auth: false } is set on the route
    if (routeOption(ctx.route, 'auth', false)) {
        return;
    }
    // Disable middleware if no route was matched to allow 404/error page
    const matches = [];
    const Components = getMatchedComponents(ctx.route, matches);
    if (!Components.length) {
        return;
    }
    const { login, callback } = ctx.$auth.options.redirect;
    const pageIsInGuestMode = routeOption(ctx.route, 'auth', 'guest');
    const insidePage = page => normalizePath(ctx.route.path) === normalizePath(page);
    let maintenance_mode = false;
    try {
        await ctx.$axios.get('/maintenance_check', { useCredentials: true, headers: { Origin: ctx.$auth.strategies.cookie.options.originAddress } });
    }
    catch (e) {
        await ctx.$axios.get('/debugger', { params: {
                error: e.message
            } });
        maintenance_mode = true;
    }
    if (!ctx.$auth.$state.loggedIn &&
        ctx != null &&
        ctx.$auth != null &&
        ctx.$auth.strategies != null &&
        ctx.$auth.strategies.cookie != null &&
        ctx.$auth.strategies.cookie.token != null &&
        ctx.$auth.strategies.cookie.token.$storage != null &&
        ctx.$auth.strategies.cookie.token.$storage._state != null &&
        ctx.$auth.strategies.cookie.token.$storage._state['_token.cookie'] != null) {
        try {
            let auth_token = ctx.$auth.strategies.cookie.token.$storage._state['_token.cookie'];
            if (~auth_token.indexOf('Bearer '))
                auth_token = auth_token.replace('Bearer ', '');
            await ctx.$axios.$post('/cookie_check', { jwt_token: auth_token }, { useCredentials: true, headers: { Origin: ctx.$auth.strategies.cookie.options.originAddress } });
            ctx.$auth.$state.loggedIn = true;
        }
        catch (e) {
            // The person isn't actually logged in still
            await ctx.$axios.get('/debugger', { params: {
                    error: e
                } });
        }
    }
    if (!maintenance_mode ||
        (maintenance_mode &&
            ctx.route.name == 'oauth-token')) {
        console.log({
            path: ctx.route.path,
            loggedIn: ctx.$auth.$state.loggedIn,
        });
        if (ctx.$auth.$state.loggedIn) {
            // -- Authorized --
            if (!login || insidePage(login) || pageIsInGuestMode) {
                ctx.$auth.redirect('home');
            }
            // Perform scheme checks.
            const { tokenExpired, refreshTokenExpired, isRefreshable } = ctx.$auth.check(true);
            // Refresh token has expired. There is no way to refresh. Force reset.
            if (refreshTokenExpired) {
                ctx.$auth.reset();
            }
            else if (tokenExpired) {
                // Token has expired. Check if refresh token is available.
                if (isRefreshable) {
                    // Refresh token is available. Attempt refresh.
                    await ctx.$auth.refreshTokens();
                }
                else {
                    // Refresh token is not available. Force reset.
                    ctx.$auth.reset();
                }
            }
            // -- Guest --
            // (Those passing `callback` at runtime need to mark their callback component
            // with `auth: false` to avoid an unnecessary redirect from callback to login)
        }
        else if (!pageIsInGuestMode && (!callback || !insidePage(callback))) {
            ctx.$auth.redirect('login');
        }
    }
    else {
        ctx.$auth.$state.maintenance_mode = true;
        if (ctx.route.path != '/maintenance' && ctx.route.name != 'oauth-token') {
            let preview_images = [];
            try {
                await ctx.$axios.get('/preview_images', { useCredentials: true, headers: { Origin: ctx.$auth.strategies.cookie.options.originAddress } });
                preview_images = [];
            }
            catch (e) {
                await ctx.$axios.get('/debugger', { params: {
                        error: e.message
                    } });
            }
            ctx.$auth.$state.preview_images = preview_images;
            ctx.$auth.redirect('/maintenance');
            ctx.redirect('/maintenance');
        }
        else {
            ctx.$auth.redirect('/');
            ctx.redirect('/');
        }
    }
}
