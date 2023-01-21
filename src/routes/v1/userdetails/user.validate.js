const Joi = require("joi")

const userDetails = {
    body: Joi.object().keys({
        user_id: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        familymemberscount: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        currentlivingspace: Joi.string().required(),
        address: Joi.string().required(),
        phone_number: Joi.string().required(),
        educational_qualification: Joi.string().required(),
        aadhar_number: Joi.string().required(),
        pan_number: Joi.string().required(),
        school_college_name: Joi.string().optional().allow("", null),
        shop_license_number: Joi.string().optional().allow("", null),
        aadhar_document: Joi.string().optional().allow("", null),
    familydetails: Joi.array().items({
        parentdetails_id: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        familymemberscount: Joi.string().optional().allow("", null),
        state: Joi.string().required(),
        district: Joi.string().required(),
        currentlivingspace: Joi.string().required(),
        address: Joi.string().required(),
        // start_time: Joi.string().required(),
        phone_number: Joi.string().required(),
        educational_qualification: Joi.string().required(),
        school_college_name: Joi.string().optional().allow("", null),
        aadhar_number: Joi.string().required(),
        pan_number: Joi.string().required(),
        aadhar_document: Joi.string().optional().allow("", null),
    }),
    }),
};

module.exports = {
    userDetails
}