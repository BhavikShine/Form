import axios from "axios";
import React, { useState, useRef } from "react";
import { ErrorMessage, useFormik } from "formik";
// import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const FormCardV3 = () => {
  const [images, setImages] = useState();
  const [data, setData] = useState({
    name: "ddd",
    image: "",
    aadharNumber: "",
    mobileNumber: "",
    sex: "Male",
    dob: "05-05-2000",
    address: "dcsd",
    landmark: "sdvds",
    area: "dvsds",
    city: "svd",
    ward: "vsd",
  });
  console.log(images, "images");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCoverImage = async (acceptedFiles) => {
    setImages(acceptedFiles[0]);
  };

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("image", images);
  formData.append("aadharNumber", data.aadharNumber);
  formData.append("mobileNumber", data.mobileNumber);
  formData.append("sex", data.sex);
  formData.append("dob", data.dob);
  formData.append("address", data.address);
  formData.append("landmark", data.landmark);
  formData.append("area", data.area);
  formData.append("city", data.city);
  formData.append("ward", data.ward);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://192.168.29.178:3000/api/v1/submitform", formData);
  };

  const LogoRef = useRef();

  return (
    <>
      <Toaster />
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4">
            <h2 className="text-center text-3xl mt-6 text-gray-900 mb-6">
              Fill Your Personal Details
            </h2>
            <div>
              <p>Drag 'n' drop some files here, or click to select files</p>
              <input
                className="img-block"
                ref={LogoRef}
                type="file"
                placeholder="Upload Newer Image"
                onChange={(e) => {
                  e.preventDefault();
                  setImages((p) => ({ ...p, image: e.target.files[0] }));
                }}
                onBlur={(e) => {
                  e.preventDefault();
                }}
              />
              {/* <Dropzone
                onDrop={handleCoverImage}
                multiple={false}
                maxSize={800000000}
                accept=".jpeg,.jpg,.png,.gif"
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="width-full">
                    {images ? (
                      <div className="img_container cover_iimg">
                        <img
                          alt=""
                          src={URL.createObjectURL(images)}
                          className="cover_iimg"
                        />
                        <input {...getInputProps()} />
                      </div>
                    ) : (
                      <div className="cover_img_container img_border">
                        <span>Drag and drop image files to upload</span>
                        <span>.jpg, .jepg, .png; up to 2MB</span>
                        <input {...getInputProps()} />
                      </div>
                    )}
                  </div>
                )}
              </Dropzone> */}
              {/* </div> */}
            </div>

            <div className="mt-5 md:mt grid grid-cols-2 gap-6 mb-6 md:grid sm:grid">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                />
              </div>
              <div>
                <label
                  for="aadharNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Aadhar Number
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="aadharNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Aadhar Number"
                />
              </div>
              <div>
                <label
                  for="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="mobileNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mobile Number"
                />
              </div>
              <div>
                <label
                  for="sex"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select id="sex" name="sex" onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label
                  for="address1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address Line 1
                </label>
                <input
                  onChange={handleChange}
                  name="address"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address Line 1"
                />
              </div>
              <div>
                <label
                  for="address2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address Line 2
                </label>
                <input
                  onChange={handleChange}
                  name="landmark"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address Line 2"
                />
              </div>
              <div>
                <label
                  for="area"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Area
                </label>
                <input
                  onChange={handleChange}
                  name="area"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Area"
                />
              </div>
              <div>
                <label
                  for="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  onChange={handleChange}
                  name="city"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="City"
                />
              </div>
              <div>
                <label
                  for="floatingField"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <div className="flex items-center justify-center">
                  <div className="datepicker relative form-floating mb-3 xl:w-96">
                    <input
                      name="dob"
                      onChange={handleChange}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select a date"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  for="ward"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ward
                </label>
                <input
                  onChange={handleChange}
                  name="ward"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ward"
                />
              </div>
            </div>
            <div className="flex items-start mb-6">
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormCardV3;
