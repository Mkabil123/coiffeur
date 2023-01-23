const httpStatus = require("http-status");
const catchAsync = require("../../../utlis/catchAsync");
const userService = require("./user.service");

const userDetails = catchAsync(async (req, res) => {
    console.log("111");
    const response = await userService.userDetails(req);
    res.status(httpStatus.OK).send(response);
});

const getUserDetails = catchAsync(async (req, res) => {
    console.log("111");
    const response = await userService.getUserDetails(req);
    res.status(httpStatus.OK).send(response);
});

const getAllUser = catchAsync(async (req, res) => {
    const response = await userService.adminUserList(req);
    res.status(httpStatus.OK).send(response);
});

const approveUser = catchAsync(async (req, res) => {
    const response = await userService.approveUser(req);
    res.status(httpStatus.OK).send(response);
});

const gettingAlluser = catchAsync(async (req, res) => {
    const response = await userService.gettingAlluser(req);
    res.status(httpStatus.OK).send(response);
});

module.exports = {
    userDetails,
    getUserDetails,
    getAllUser,
    approveUser,
    gettingAlluser
}