const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvtisceko",
  api_key: "661824158127633",
  api_secret: "sr_S-LAQK1gztg6n1Di-6z27c30",
});

module.exports = cloudinary;
