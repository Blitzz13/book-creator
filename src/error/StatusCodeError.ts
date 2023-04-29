export class StatusCodeError extends Error {
    private _statusCode: number
    constructor(message: string, errorCode: number) {
        super();
        this.message = message;
        this._statusCode = errorCode;
    }

    public get statusCode():number {
        return this._statusCode;
    }
}