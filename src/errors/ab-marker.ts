export class MarkerError extends Error {
    code: string;

    constructor(code: string, message?: string) {
        super(message || code);
        this.name = 'MarkerError';
        this.code = code;
    }
}