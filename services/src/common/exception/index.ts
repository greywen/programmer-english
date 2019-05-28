class BaseException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BaseException.prototype);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super(message);
    }
}


export function BadRequestException(message?: string) {
    return {
        statusCode: 400,
        message: message || "Internal Server Error"
    }
}

export function InternalServerException(message?: string) {
    return {
        statusCode: 500,
        message: message || "Internal Server Error"
    }
}

export function NotFoundException(message: string) {
    return {
        statusCode: 404,
        message: message
    }
}