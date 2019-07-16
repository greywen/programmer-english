class BaseException extends Error {
    status: number;
    code: number;
    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(message: string, code?: number) {
        super(message);
        this.name = "Unauthorized";
        this.status = 401;
        this.code = code;
    }
}

export class BadRequestException extends BaseException {
    constructor(message: string, code?: number) {
        super(message);
        this.name = "BadRequest";
        this.status = 400;
        this.code = code;
    }
}

export class InternalServerException extends BaseException {
    constructor(message: string, code?: number) {
        super(message);
        this.name = "InternalServerException";
        this.status = 500;
        this.code = code;
    }
}

export class NotFoundException extends BaseException {
    constructor(message: string, code?: number) {
        super(message);
        this.name = "NotFound";
        this.status = 404;
        this.code = code;
    }
}