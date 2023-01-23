const express = require("express");
const validate = require("../../../middlewares/validate");
const userValidation = require("./user.validate")
const userController=require("./user.controller")

const router = express.Router();

router.post("/userdetails", validate(userValidation.userDetails), userController.userDetails)
router.get("/userdetailsbyid", validate(userValidation.getUserDetails), userController.getUserDetails)
router.get("/adminuserlist", userController.getAllUser)
router.get("/adminactiveuserlist", userController.getAllUser)
router.post("/approveadminuser", validate(userValidation.approveUser), userController.approveUser)

module.exports = router;