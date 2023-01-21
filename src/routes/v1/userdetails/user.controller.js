const httpStatus = require("http-status");
const catchAsync = require("../../../utlis/catchAsync");
const userService = require("./user.service");

const userDetails = catchAsync(async (req, res) => {
    console.log("111");
    const response = await userService.userDetails(req);
    res.status(httpStatus.OK).send(response);
});


module.exports = {
    userDetails
}