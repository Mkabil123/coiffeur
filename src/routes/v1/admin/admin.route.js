const express = require("express");
const router = express.Router();
const adminValidation = require("./admin.validate")
const adminController=require("./admin.controller")

router.post("/login",adminController.adminLogin)

module.exports = router;