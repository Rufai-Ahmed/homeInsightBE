const { Schema, model } = require("mongoose");

const reviewModel = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },
    landlordRating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5,
    },
    environmentRating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5,
    },
    amenitiesRating: {
      type: Number,
      default: 0,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("reviews", reviewModel);
