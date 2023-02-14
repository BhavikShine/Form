const catchAsyncError = require("../../middleware/catchAsyncError");
const ErrorHandler = require("../../utils/ErrorHandler");
const { FormDataService } = require("./form.service");

exports.FormSubmit = catchAsyncError(async (req, res, next) => {
  try {
    const formData = await FormDataService(
      req.body,
    );
    res.status(201).json({
      message: "Form Created Successfully",
      success: true,
      formData,
    });
  } catch (err) {
    console.log(err, "Errr");
    if (err?.keyValue?.aadharNumber && err.code === 11000) {
      return next(new ErrorHandler("Duplicate Aadhar Number Found", 400));
    } else if (err?.keyValue?.mobileNumber && err.code === 11000) {
      return next(new ErrorHandler("Duplicate Mobile Number Found", 400));
    }

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
