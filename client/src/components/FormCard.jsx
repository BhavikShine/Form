import axios from "axios";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 charecters are required!")
    .max(50, "Maximum 50 charecters are allowed!")
    .required("Name is required"),
  aadharNumber: Yup.string()
    .max(12, "Maximum 12 digits are allowed!")
    .min(12, "Maximum 12 digits are allowed!")
    .required("Aadhar number is required"),
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Mobile number is not valid")
    .required("Mobile number is required"),
  // profileImg: Yup.mixed().required("Profile image is required"),
  sex: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  landmark: Yup.string().required("Address Line 2 is required"),
  area: Yup.string().required("Area is required"),
  city: Yup.string().required("City is required"),
  ward: Yup.string().required("Ward is required"),
});

const Dropdown = ({ options, field, form }) => {
  return (
    <select
      {...field}
      name="sex"
      className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const FormCard = () => {
  const [serverError, setServerError] = useState(null);
  // const [images, setImages] = useState();
  // console.log(images, "images");
  const navigate = useNavigate();

  const initialValues = {
    name: "ddd",
    // image: "",
    aadharNumber: "",
    mobileNumber: "",
    sex: "Male",
    dob: "05-05-2000",
    address: "dcsd",
    landmark: "sdvds",
    area: "dvsds",
    city: "svd",
    ward: "vsd",
  };
  console.log(initialValues);

  // const handleCoverImage = async (acceptedFiles) => {
  //   setImages(acceptedFiles[0]);
  // };

  const submitForm = async (
    values,
    setSubmitting,
    resetForm,
    setServerError
  ) => {
    try {
      // Add code for sending the form data to the server here
      const formData = new FormData();
      formData.append("name", values.name);
      // formData.append("image", images);
      formData.append("aadharNumber", values.aadharNumber);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("sex", values.sex);
      formData.append("dob", values.dob);
      formData.append("address", values.address);
      formData.append("landmark", values.landmark);
      formData.append("area", values.area);
      formData.append("city", values.city);
      formData.append("ward", values.ward);

      const response = await axios.post(
        "http://192.168.29.178:3000/api/v1/submitform",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If the request is successful, show a success message and reset the form
      toast.success(response.data.message);
      resetForm();
      setTimeout(() => {
        navigate("/");
        Cookies.remove("tokenShine2023");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
      // If there is a server error, show the error message
      setServerError(error.response.data.message);
    } finally {
      // Set the submitting status to false
      setSubmitting(false);
    }
  };

  // const ref = useRef();

  return (
    <>
      <Toaster />
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={FormSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              submitForm(values, setSubmitting, resetForm, setServerError);
            }}
          >
            {({ isSubmitting }) => (
              <Form
                className="bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4"
              >
                <h2 className="text-center text-3xl mt-6 text-gray-900 mb-6">
                  Fill Your Personal Details
                </h2>

                
                {/* <div>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <Dropzone
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
                  </Dropzone>
                </div> */}

                <div className="mt-5 md:mt grid grid-cols-2 gap-6 mb-6 md:grid sm:grid">
                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      // onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="aadharNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Aadhar Number
                    </label>
                    <Field
                      type="number"
                      // onChange={handleChange}
                      name="aadharNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Aadhar Number"
                    />
                    <ErrorMessage
                      name="aadharNumber"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="mobile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mobile Number
                    </label>
                    <Field
                      type="number"
                      // onChange={handleChange}
                      name="mobileNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mobile Number"
                    />
                    <ErrorMessage
                      name="mobileNumber"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="sex"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Default select
                    </label>
                    <Field
                      name="sex"
                      component={Dropdown}
                      options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                        { value: "Other", label: "Other" },
                      ]}
                    />
                  </div>
                  <div>
                    <label
                      for="address1"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address Line 1
                    </label>
                    <Field
                      name="address"
                      // onChange={handleChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Address Line 1"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="address2"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address Line 2
                    </label>
                    <Field
                      name="landmark"
                      // onChange={handleChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Address Line 2"
                    />
                    <ErrorMessage
                      name="landmark"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="area"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Area
                    </label>
                    <Field
                      name="area"
                      // onChange={handleChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Area"
                    />
                    <ErrorMessage
                      name="area"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div>
                    <label
                      for="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <Field
                      name="city"
                      // onChange={handleChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="City"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      style={{ color: "red" }}
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
                        <Field
                          name="dob"
                          // onChange={handleChange}
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select a date"
                          max={new Date().toISOString().split("T")[0]}
                        />
                        <ErrorMessage
                          name="dob"
                          component="div"
                          style={{ color: "red" }}
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
                    <Field
                      name="ward"
                      // onChange={handleChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ward"
                    />
                    <ErrorMessage
                      name="ward"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default FormCard;
