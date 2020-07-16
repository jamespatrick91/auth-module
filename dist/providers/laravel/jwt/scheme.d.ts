import RefreshScheme from '../../../schemes/refresh';
export default class LaravelJWT extends RefreshScheme {
    _updateTokens(response: any, { isRefreshing, updateOnRefresh }?: {
        isRefreshing?: boolean;
        updateOnRefresh?: boolean;
    }): void;
}
