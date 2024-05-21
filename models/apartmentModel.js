const { Schema, Types, model } = require("mongoose");

const apartmentModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    landlord: {
      type: Types.ObjectId,
      ref: "users",
    },
    amenities: {
      type: [String],
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    reviews: [
      {
        type: Types.ObjectId,
        ref: "reviews",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("apartments", apartmentModel);
