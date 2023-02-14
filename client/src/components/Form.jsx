import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
const Form = () => {
  const [images, setImages] = useState();
  const [data, setData] = useState({ name: "", mobileNumber: "" });

  console.log(images, "images");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append("image", images);
  formData.append("name", "bhavik");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/v1/submitform", formData);
  };

  const handleCoverImage = async (acceptedFiles) => {
    setImages(acceptedFiles[0]);
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-2xl rounded-3xl px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="text-center text-3xl font-bold mt-6 text-gray-900">
              Sign in to your account
            </h2>
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
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="mobileNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number"
              />
            </div>
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
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // type="submit"

              onClick={(e) => handleSubmit(e)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
