import defu from 'defu';
export default class BaseScheme {
    $auth;
    options;
    constructor($auth, ...options) {
        this.$auth = $auth;
        this.options = options.reduce((p, c) => defu(p, c), {});
    }
    get name() {
        return this.options.name;
    }
}
