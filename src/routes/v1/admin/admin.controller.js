const httpStatus = require("http-status");
const catchAsync = require("../../../utlis/catchAsync");
const adminService = require("./admin.service");

const adminLogin = catchAsync(async (req, res) => {
    const response = await adminService.loginUserWithEmailAndPassword(req);
    console.log(response,"hjfdbdfj");
    res.status(httpStatus.OK).send(response);
});

module.exports = {
    adminLogin
}