const catchAsyncError = require("../../middleware/catchAsyncError");

const Form = require("./form.model");

exports.formSubmitV2 = catchAsyncError(async (req, res) => {
  try {
    const form = new Form({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      aadharNumber: req.body.aadharNumber,
      sex: req.body.sex,
      dob: req.body.dob,
      address: req.body.address,
      landmark: req.body.landmark,
      area: req.body.area,
      city: req.body.city,
      ward: req.body.ward,
      profileImage: req.file.path,
    });

    const formData = await form.save();

    res.status(200).send({
      success: true,
      message: "Form submitted successfully!",
      data: formData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error submitting form",
      error,
    });
  }
});
