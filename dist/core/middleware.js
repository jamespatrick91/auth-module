import { routeOption, getMatchedComponents, normalizePath } from '../utils';
import { CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUserSession } from 'amazon-cognito-identity-js';
import { parse as parseCookie } from 'cookie';

function getCookies(ctx) {
	const cookieStr = process.client
		? document.cookie
		: ctx.req.headers.cookie;
	return parseCookie(cookieStr || '') || {};
}

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

	let cookies = getCookies(ctx);

	if (
		'accessToken' in cookies &&
		'idToken' in cookies &&
		'refreshToken' in cookies
	) {
		// Check with Cognito

		let access = new CognitoAccessToken({ AccessToken: cookies['accessToken'] })
		let id = new CognitoIdToken({ IdToken: cookies['idToken'] })
		let refresh = new CognitoRefreshToken({ RefreshToken: cookies['refreshToken'] })

		let session = new CognitoUserSession({
			AccessToken: access,
			IdToken: id,
			RefreshToken: refresh
		})

		ctx.$auth.$state.loggedIn = session.isValid()
	}

    const { login, callback } = ctx.$auth.options.redirect;
    const pageIsInGuestMode = routeOption(ctx.route, 'auth', 'guest');
    const insidePage = page => normalizePath(ctx.route.path) === normalizePath(page);
    let query = await ctx.$axios.post('/', {
        query: 'query AgentsSingle($where: SequelizeJSON) { agents(where: $where) { settings { maintenance_mode_active }}}',
        variables: {
            where: {
				api_key: ctx.$config.API_KEY
			}
        }
    }, {headers: {'x-api-key': ctx.$config.API_KEY}});

	let maintenance_mode = query.data.data.agents[0].settings[0].maintenance_mode_active;
    if (!maintenance_mode ||
        (maintenance_mode &&
            ctx.route.name == 'oauth-token')) {
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
