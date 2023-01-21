const httpStatus = require("http-status");
const Sequelize = require("sequelize");
const moment = require("moment");
const { Op } = Sequelize;
const db = require("../../../models");
const User = db.user;
const familyDetails = db.userDetails
const ApiError = require("../../../utlis/Apierror");
const { sequelize, user, userAddress } = require("../../../models");

const userDetails = async (req) => {
    try {
        const Usercheck = await User.findAll(
            {
                where: {
                    user_id: req.body.user_id,
                },
            }
        );
        if(Usercheck){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "User has already created"
            );  
        }
        let route = {};
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
            aadhar_document: req.body.aadhar_document,
        };
        route.route_details = await User.create(userDetails);
        if (route.route_details) {
            req.body.familydetails.forEach(async (item) => {
                let routeStops = await familyDetails.create({
                    parentdetails_id: item.parentdetails_id,
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
                    aadhar_document: item.aadhar_document,
                });
                if (!routeStops) {
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
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};



module.exports = {
    userDetails
}