const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;
const db = require("../../../models");
const User = db.admin;
const ApiError = require("../../../utlis/Apierror");
const { sequelize, user, userAddress } = require("../../../models");
const bcrypt = require("bcryptjs");


const getByEmail = async (email) => {
    const user = await User.findOne({
        where: { email: email, is_active: 1 }
    },
    );
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email");
    return user.dataValues;
};

const checkPassword = async (actualPassword, payloadPassword) => {
    const isCorrectPassword = await bcrypt.compare(
        actualPassword,payloadPassword
        
    );
    return isCorrectPassword;
};

const loginUserWithEmailAndPassword = async (req) => {
    const user = await getByEmail(req.body.email);
    if (!user.is_email_verified) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email ID not verified");
    }
    // console.log(user.password)

    // if (user && !(await checkPassword(user.password, req.body.password))) {
    //     throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    // }
    // delete user.password;
    // console.log(user);
    return user;
 
};


module.exports = {
    loginUserWithEmailAndPassword
}