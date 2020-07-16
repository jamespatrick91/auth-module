import type { Scheme } from '../';
import Storage from '../core/storage';
import TokenStatus from './token-status';
export default class RefreshToken {
    scheme: Scheme;
    $storage: Storage;
    constructor(scheme: Scheme, storage: Storage);
    _getExpiration(): any;
    _setExpiration(expiration: any): any;
    _syncExpiration(): any;
    _updateExpiration(refreshToken: any): any;
    _setToken(refreshToken: any): any;
    _syncToken(): any;
    get(): any;
    set(tokenValue: any): any;
    sync(): any;
    reset(): void;
    status(): TokenStatus;
}
