const express = require("express");
const multer = require("multer");
const { FormSubmit } = require("./form.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: async function (req, file, cb) {
    const extension = await file.originalname.split(".").slice(-1).pop();
    const finalFilename = await `${Date.now()}.${extension}`;
    cb(null, finalFilename);
  },
});
const upload = multer({ storage });
const router = express.Router();

//Post ------------------------------------------------>>
// router.route("/submitform").post(FormSubmit);
router.route("/submitform").post(upload.single("image"), FormSubmit);

module.exports = router;

