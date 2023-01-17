class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '', field = '') {
        console.log(statusCode,"sjs");
        console.log(isOperational,"shshs");
        console.log(field,"sjhsj");
        console.log(message,"54512");
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