import Token from '../inc/token';
import RequestHandler from '../inc/request-handler';
import type { SchemeCheck, SchemeOptions, HTTPRequest } from '../';
import BaseScheme from './_scheme';
declare const DEFAULTS: SchemeOptions;
export default class LocalScheme extends BaseScheme<typeof DEFAULTS> {
    token: Token;
    requestHandler: RequestHandler;
    constructor($auth: any, options: any, ...defaults: {});
    _updateTokens(response: any): void;
    _initializeRequestInterceptor(): void;
    check(checkStatus?: boolean): SchemeCheck;
    mounted({ tokenCallback, refreshTokenCallback }?: {
        tokenCallback?: () => any;
        refreshTokenCallback?: any;
    }): any;
    login(endpoint: any, { reset }?: {
        reset?: boolean;
    }): unknown;
    setUserToken(token: any): unknown;
    fetchUser(endpoint?: any): unknown;
    logout(endpoint?: HTTPRequest): unknown;
    reset({ resetInterceptor }?: {
        resetInterceptor?: boolean;
    }): void;
}
export {};
