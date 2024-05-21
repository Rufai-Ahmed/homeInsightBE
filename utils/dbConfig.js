const mongoose = require("mongoose");

const URL =
  "mongodb+srv://abbeyrufai234:abbeyrufai234@cluster0.yokwex4.mongodb.net/reviewDB?retryWrites=true&w=majority&appName=Cluster0";

const dbConfig = async () => {
  try {
    return await mongoose.connect(URL);
  } catch (error) {
    return error;
  }
};

module.exports = dbConfig;
