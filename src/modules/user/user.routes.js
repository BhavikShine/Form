const express = require("express");

const { registerUser, logout } = require("./user.controller");

const router = express.Router();

//Post ------------------------------------------------>>
router.route("/register").post(registerUser);

//Get  ------------------------------------------------>>
router.route("/logout").get(logout);

module.exports = router;
