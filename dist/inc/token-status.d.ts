export declare enum TokenStatusEnum {
    UNKNOWN = "UNKNOWN",
    VALID = "VALID",
    EXPIRED = "EXPIRED"
}
export default class TokenStatus {
    private _status;
    constructor(token: any, tokenExpiresAt: any);
    _calculate(token: any, tokenExpiresAt: any): TokenStatusEnum;
    unknown(): boolean;
    valid(): boolean;
    expired(): boolean;
}
