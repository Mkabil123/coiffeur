const Joi = require("joi")

const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message("password must be at least 8 characters");
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message(
            "password must contain at least 1 letter and 1 number"
        );
    }
    return value;
};

const adminlogin = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

const signup = {
    body: Joi.object().keys({
        FirstName: Joi.string().required(),
        LastName: Joi.string().required(),
        Email: Joi.string().email().required(),
        Password: Joi.string().required().custom(password),
        PhoneNumber: Joi.string().required()
    }),
};

const verifyCode = {
    query: Joi.object().keys({
        email: Joi.string().email().required(),
        auth_code: Joi.string().required(),
        type: Joi.string().required(),
    }),
};

module.exports = {
    adminlogin,
    signup,
    verifyCode
}