const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;
const crypto = require("crypto");
const db = require("../../../models");
const User = db.admin;
const ApiError = require("../../../utlis/Apierror");
const { sequelize, user, userAddress } = require("../../../models");
const bcrypt = require("bcryptjs");
const { sendWelcomeMail } = require("../../../services/email.service");

const generateVerificationCode = (
    length = 6,
    wishlist = '1234567890'
) => Array.from(crypto.randomFillSync(new Uint32Array(length))).map((x) => wishlist[x % wishlist.length]).join("")



const getByEmail = async (email) => {
    const user = await User.findOne({
        where: { email: email, is_active: 1 }
    },
    );
    if (!user) {
         throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email");
    }
       
    return user.dataValues;
};

const checkPassword = async (actualPassword, payloadPassword) => {
    const isCorrectPassword = await bcrypt.compare(
        payloadPassword,actualPassword
        
    );
    return isCorrectPassword;
};

const loginUserWithEmailAndPassword = async (req) => {
    const user = await getByEmail(req.body.email);
    if (!user.is_email_verified) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email ID not verified");
    }
    if (user && !(await checkPassword(user.password, req.body.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    delete user.password;
    return user;
 
};

const signup = async (req, res) => {
    const emailValidation = await User.findOne({
        where: {
            email: req.Email,
            is_active: 1
        }
    });
    console.log(emailValidation);
    if (emailValidation) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email is already in use");
    }
    const phValidation = await User.findOne({
        where: {
            phone_number: req.PhoneNumber,
            is_active: 1
        }
    });
    if (phValidation) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "PhoneNumber is already in use");
    }
    if (!phValidation && !emailValidation) {
        const user = await User.create({
            first_name: req.FirstName,
            last_name: req.LastName,
            email: req.Email,
            phone_number: req.PhoneNumber,
            password: req.Password,
            auth_code: generateVerificationCode(),
            createdAt: new Date(),
        });
        delete user.dataValues.password;
        await sendWelcomeMail(user);
        return {
            message: "Sign up successful.Verification code sent to registered email",
            user,
        };
    };
}


const verifyCode = async (req) => {
    const user = await User.findOne({
        where: {
            email: { [Op.eq]: `${req.email}` },
            auth_code: { [Op.eq]: `${req.auth_code}` },
        },
    });
    if (user && !user.is_email_verified && req.type == "verifyEmail") {
        user.update({ is_email_verified: true });

        return {
            status: "success",
            message: "Logging in successfully",
            user: user
        };
    }
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect Verification Code");
    }
    if (moment(new Date()).utc() < user.expires_on || user.expires_on == "") {
        return {
            status: "success",
            message: "Verified Successfully",
        };
    }
    const otp = generateVerificationCode();
    await user.update({
        expires_on: moment().add(10, "minutes").utc(),
    });
    sendOtpEmail(user, otp);
    return {
        message:
            "Verification code expired.New verification code sent to registered email_id",
    };
};


module.exports = {
    loginUserWithEmailAndPassword,
    signup,
    verifyCode
}