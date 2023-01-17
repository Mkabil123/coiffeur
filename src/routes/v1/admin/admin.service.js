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
    if (!user) {
        //  throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email");
        // // console.log("gui");
        return {
            status: 400,
            message:"Incorrect email"
        }
    }
       
    return user.dataValues;
};

const checkPassword = async (actualPassword, payloadPassword) => {
    console.log(actualPassword),
        console.log(payloadPassword);
    const isCorrectPassword = await bcrypt.compare(
        payloadPassword,actualPassword
        
    );
    return isCorrectPassword;
};

const loginUserWithEmailAndPassword = async (req) => {
    const user = await getByEmail(req.body.email);
    if (!user.is_email_verified) {
        // throw new ApiError(httpStatus.UNAUTHORIZED, "Email ID not verified");
        console.log("hello")
        return {
            status: 400,
            message: "Email ID not verified"
        }
    }
    // console.log(user.password)
    console.log(user);
    if (user && !(await checkPassword(user.password, req.body.password))) {
        // return ("Incorrect")
        // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
        return {
            status: 400,
            message: "Incorrect password"
        }
    }
    delete user.password;
    // console.log(user);
    return user;
 
};


module.exports = {
    loginUserWithEmailAndPassword
}