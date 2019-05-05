export class BaseException extends Error {
    status: number = 404;
    constructor(message: string, status?: number) {
        super();
        this.message = message;
        this.status = status;
    }
}

export class BadRequestException extends BaseException {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super(message, 401);
    }
}

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super(message, 404);
    }
}

export class InternalServerException extends BaseException {
    constructor(message: string) {
        super(message, 500);
    }
}