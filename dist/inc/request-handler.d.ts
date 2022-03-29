import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import type { Scheme, HTTPRequest } from '../';
export default class RequestHandler {
    scheme: Scheme;
    axios: NuxtAxiosInstance;
    interceptor: any;
    constructor(scheme: any, axios: any);
    _needToken(config: HTTPRequest): any;
    _getUpdatedRequestConfig(config: HTTPRequest, token: any): HTTPRequest;
    _requestHasAuthorizationHeader(config: HTTPRequest): boolean;
    setHeader(token: any): void;
    clearHeader(): void;
    initializeRequestInterceptor(refreshEndpoint?: string): void;
    reset(): void;
}
