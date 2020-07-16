import type { Scheme, Auth } from '../';
export default class RefreshController {
    scheme: Scheme;
    $auth: Auth;
    private _refreshPromise;
    constructor(scheme: Scheme);
    _doRefresh(): any;
    handleRefresh(): any;
}
