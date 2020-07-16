export declare const isUnset: (o: any) => boolean;
export declare const isSet: (o: any) => boolean;
export declare function isSameURL(a: any, b: any): boolean;
export declare function isRelativeURL(u: any): any;
export declare function parseQuery(queryString: any): {};
export declare function encodeQuery(queryObject: {
    [key: string]: string;
}): any;
interface VueComponent {
    options: object;
    _Ctor: VueComponent;
}
declare type match = {
    components: VueComponent[];
};
declare type Route = {
    matched: match[];
};
export declare function routeOption(route: Route, key: any, value: any): any;
export declare function getMatchedComponents(route: Route, matches?: {}): any;
export declare function normalizePath(path?: string): any;
export declare function encodeValue(val: any): any;
export declare function decodeValue(val: any): any;
/**
 * Get property defined by dot notation in string.
 * Based on  https://github.com/dy/dotprop (MIT)
 *
 * @param  {Object} holder   Target object where to look property up
 * @param  {string} propName Dot notation, like 'this.a.b.c'
 * @return {*}          A property value
 */
export declare function getProp(holder: any, propName: any): any;
export declare function getResponseProp(response: any, prop: any): any;
export declare function addTokenPrefix(token: any, tokenType: any): any;
export declare function removeTokenPrefix(token: any, tokenType: any): any;
export declare function urlJoin(...args: {}): any;
export declare function cleanObj(obj: any): any;
export {};
