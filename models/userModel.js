const { Schema, model } = require("mongoose");

const userModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    landlord: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("users", userModel);
