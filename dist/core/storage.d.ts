export default class Storage {
    ctx: any;
    options: any;
    state: any;
    private _state;
    private _useVuex;
    constructor(ctx: any, options: any);
    setUniversal(key: any, value: any): any;
    getUniversal(key: any): any;
    syncUniversal(key: any, defaultValue?: any): any;
    removeUniversal(key: any): void;
    _initState(): void;
    setState(key: any, value: any): any;
    getState(key: any): any;
    watchState(key: any, fn: any): any;
    removeState(key: any): void;
    setLocalStorage(key: any, value: any): any;
    getLocalStorage(key: any): any;
    removeLocalStorage(key: any): void;
    getCookies(): any;
    setCookie(key: any, value: any, options?: {
        prefix?: string;
    }): any;
    getCookie(key: any): any;
    removeCookie(key: any, options?: any): void;
}
