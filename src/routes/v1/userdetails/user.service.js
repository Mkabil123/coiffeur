const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;
const db = require("../../../models");
const Admin=db.admin
const User = db.user;
const familyDetails = db.userDetails
const ApiError = require("../../../utlis/Apierror");
const { sequelize, user, userAddress } = require("../../../models");
const { now } = require("moment");


const userDetails = async (req) => {
    try {
        const userCheck = await Admin.findOne({
            where: {
                user_id:req.body.user_id
            }
        })
        if (!userCheck) {
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "User is invalid"
            );
        }
        const UserDetailscheck = await User.findAll(
            {
                where: {
                    user_id: req.body.user_id,
                },
            }
        );
        const familyDetailscheck = await familyDetails.findAll(
            {
                where: {
                    parentdetails_id: req.body.user_id,
                },
            }
        );
        if (UserDetailscheck) {
            await User.destroy({
                    where: {
                        user_id: req.body.user_id,
                    },
                    truncate: false,
                })  
        }
        if (familyDetailscheck) {
            await familyDetails.destroy({
                    where: {
                        parentdetails_id: req.body.user_id,
                    },
                    truncate: false,
                })}
        let user = {};
        const userDetails = {
            user_id: req.body.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            familymemberscount: req.body.familymemberscount,
            state: req.body.state,
            district: req.body.district,
            currentlivingspace: req.body.currentlivingspace,
            address: req.body.address,
            phone_number: req.body.phone_number,
            educational_qualification: req.body.educational_qualification,
            aadhar_number: req.body.aadhar_number,
            pan_number: req.body.pan_number,
            school_college_name: req.body.school_college_name,
            shop_license_number: req.body.shop_license_number,
            aadhar_document: req.body.aadhar_document
        };
        user.user_details = await User.create(userDetails);
        if (user.user_details) {
            req.body.familydetails.forEach(async (item) => {
                let userdetails = await familyDetails.create({
                    parentdetails_id: user.user_details.userdetails_id,
                    first_name: item.first_name,
                    last_name: item.last_name,
                    familymemberscount: item.familymemberscount,
                    state: item.state,
                    district: item.district,
                    currentlivingspace: item.currentlivingspace,
                    address: item.address,
                    phone_number: item.phone_number,
                    educational_qualification: item.educational_qualification,
                    aadhar_number: item.aadhar_number,
                    pan_number: item.pan_number,
                    school_college_name: item.school_college_name,
                    shop_license_number: item.shop_license_number,
                    aadhar_document: item.aadhar_document
                    
                });
                if (!userdetails) {
                    throw new ApiError(
                        httpStatus.INTERNAL_SERVER_ERROR,
                        "Something went wrong"
                    );
                }
            });
        } else {
            throw new ApiError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Something went wrong"
            );
        }
        return {
            status: "success",
            message: "User Details Updated Successfully"
        };
    } catch (error) {
        console.log(error,"dnjdsnf");
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getUserDetails = async (req) => {
    const Usercheck = await User.findAll(
        {
            where: {
                user_id: req.query.user_id,
            },
        }
    );
    if (!Usercheck) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User does not exist");
    }
    const user = await User.findOne({
        where: {
            user_id: req.query.user_id
        },
        include: [
            {
                model: familyDetails,
            },
        ],
        order: [[familyDetails, "updatedAt", "DESC"]],
    })
    return user
}

const adminUserList = async (req) => {
    const getAllUser = await User.findAll({
        include: [
            {
                model: familyDetails,
                status: 0
            },
        ],
        order: [[familyDetails, "updatedAt", "DESC"]],
})
    return getAllUser
}

const gettingAlluser = async (req) => {
    const getAllUser = await User.findAll({
        include: [
            {
                model: familyDetails,
                status: { [Op.ne]: 0 }
            },
        ],
        order: [[familyDetails, "updatedAt", "DESC"]],
    })
    return getAllUser
}

const approveUser = async (req) => {
    const Usercheck = await User.findAll(
        {
            where: {
                user_id: req.query.user_id,
            },
        }
    );
    if (!Usercheck) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "User does not exist");
    }
    update = {}
    if (req.query.status && req.query.status != "") {
        switch (req.body.stop_status) {
            case "Accept":
                update.status = 1;
                break;
            case "Decline":
                update.status = 2;
                break;
        }
    }
    const user = await User.update(
        {status:update.status},
        { where: { user_id: req.query.user_id } })
    if (user) {
        return {
            status: "success",
            message: "User updated Successfully",
        };
    }
}




module.exports = {
    userDetails,
    getUserDetails,
    adminUserList,
    approveUser,
    gettingAlluser
}