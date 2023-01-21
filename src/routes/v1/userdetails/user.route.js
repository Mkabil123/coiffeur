const express = require("express");
const validate = require("../../../middlewares/validate");
const userValidation = require("./user.validate")
const userController=require("./user.controller")

const router = express.Router();

router.post("/userdetails",validate(userValidation.userDetails),userController.userDetails)

module.exports = router;