const mongoose = require("mongoose");

const URL = "mongodb://localhost:27017/revieDB";

const dbConfig = async () => {
  try {
    return await mongoose.connect(URL);
  } catch (error) {
    return error;
  }
};

module.exports = dbConfig;
