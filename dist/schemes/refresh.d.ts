import RefreshController from '../inc/refresh-controller';
import RefreshToken from '../inc/refresh-token';
import type { SchemeCheck } from '../index';
import LocalScheme from './local';
export default class RefreshScheme extends LocalScheme {
    refreshToken: RefreshToken;
    refreshController: RefreshController;
    constructor($auth: any, options: any);
    _updateTokens(response: any, { isRefreshing, updateOnRefresh }?: {
        isRefreshing?: boolean;
        updateOnRefresh?: boolean;
    }): void;
    _initializeRequestInterceptor(): void;
    check(checkStatus?: boolean): SchemeCheck;
    mounted(): any;
    refreshTokens(): unknown;
    setUserToken(token: any, refreshToken?: any): unknown;
    reset({ resetInterceptor }?: {
        resetInterceptor?: boolean;
    }): void;
}
