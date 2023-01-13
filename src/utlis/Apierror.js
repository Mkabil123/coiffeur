class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '', field = '') {
        console.log(statusCode);
        console.log(isOperational);
        console.log(field);
        console.log(message);
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.field = field;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;