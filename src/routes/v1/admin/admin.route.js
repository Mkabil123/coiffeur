const express = require("express");
const validate = require("../../../middlewares/validate");
const router = express.Router();
const adminValidation = require("./admin.validate")
const adminController=require("./admin.controller")

router.post("/login",validate(adminValidation.adminlogin), adminController.adminLogin)
router.post("/signup", validate(adminValidation.signup), adminController.signup)
router.post("/verifycode",validate(adminValidation.verifyCode),adminController.verifyCode)

module.exports = router;