const express = require("express");
const router = express.Router();
const userService = require("./user.service.js"); 

router.post("/register", userService.registerUser);
router.post("/login", userService.loginUser);
router.post("/verifyEmail", userService.verifyEmail);
router.post("/resetPassword", userService.forgetPassword);
module.exports = router;

