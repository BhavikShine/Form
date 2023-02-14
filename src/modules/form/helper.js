const { createFormService } = require("./form.service");
const catchAsyncError = require("../../middleware/catchAsyncError");
// const cloudinary = require("cloudinary");

exports.formSubmit = catchAsyncError(async (req, res) => {
  try {
    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });
    // let images = req?.files?.images;
    // await cloudinary.v2.uploader.upload(
    //   images?.tempFilePath,
    //   { resource_type: "auto" },
    //   (err, res) => {
    //     try {
    //       console.log(res, "res");
    //       images = res?.url;
    //     } catch (err) {
    //       return res.status(500).json({
    //         success: false,
    //         message: "There was an error uploading the image",
    //       });
    //     }
    //   }
    // );
    // images.public_id = result.public_id;
    // images.url = result.secure_url;
    // const formData = { ...req.body, images };
    // const formData = req.body.images

    const formData = await createFormService(req.body);
    res.status(201).json({
      message: "Form Created Successfully",
      success: true,
      formData,
    });
  } catch (error) {
    console.log(error);
  }
});
