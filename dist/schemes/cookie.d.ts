import type { SchemeCheck } from '../index';
import LocalScheme from './local';
export default class CookieScheme extends LocalScheme {
    constructor($auth: any, options: any);
    mounted(): any;
    check(): SchemeCheck;
    login(endpoint: any): unknown;
    reset(): void;
}
