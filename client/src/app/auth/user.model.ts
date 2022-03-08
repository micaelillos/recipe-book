export class User {
    constructor(public email: string,
        public password: string,
        private _token?: string,
        private _tokenExpiry?: Date

    ) { }
    get token() {
        if (!this._tokenExpiry || new Date() > this._tokenExpiry)
            return null
        return this._token
    }

    get tokenExpiry() { return this._tokenExpiry }
}