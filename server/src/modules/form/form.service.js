/* eslint-disable no-useless-catch */
const formModel = require("./form.model");

exports.FormDataService = async (payload) => {
  try {
    return await formModel.create(payload);
  } catch (err) {
    throw err;
  }
};
