const httpStatus = require("http-status");
const catchAsync = require("../../../utlis/catchAsync");
const adminService = require("./admin.service");

const adminLogin = catchAsync(async (req, res) => {
    const response = await adminService.loginUserWithEmailAndPassword(req);
    res.status(httpStatus.OK).send(response);
});

const signup = catchAsync(async (req, res) => {
    const response = await adminService.signup(req.body);
    res.status(httpStatus.OK).send(response);
});

const verifyCode = catchAsync(async (req, res) => {
    const response = await adminService.verifyCode(req.query);
    res.status(httpStatus.OK).send({ response });
});

const addBlob = catchAsync(async (req, res) => {
    const response = await adminService.addBlob(req);
    res.status(httpStatus.OK).send(response);
});

const editBlob = catchAsync(async (req, res) => {
    const response = await adminService.editBlob(req);
    res.status(httpStatus.OK).send(response);
});

module.exports = {
    adminLogin,
    signup,
    verifyCode,
    addBlob,
    editBlob
}