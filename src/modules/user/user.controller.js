const catchAsyncError = require("../../middleware/catchAsyncError");
const sendToken = require("../../utils/jwtToken");
// const sendEmail = require("../utils/sendEmail");
const { registerUserService } = require("./user.service");

// Register User Controller ----------------------------------------->>

exports.registerUser = catchAsyncError(async (req, res) => {
  const userData = await registerUserService(req.body);
  sendToken(userData, 201, res);
});

// Logout User Controller   ----------------------------------------->>

exports.logout = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // Expires token immediately
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});
