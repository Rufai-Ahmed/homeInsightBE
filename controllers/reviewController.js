const apartmentModel = require("../models/apartmentModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");
const { streamUpload } = require("../utils/streamifier");

// Create review
exports.createReview = async (req, res) => {
  try {
    const { apartmentID, userID } = req.params;

    const { public_id, secure_url } = await streamUpload(req);

    const { landlordRating, environmentRating, amenitiesRating, comments } =
      req.body;

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const apartmentExists = await apartmentModel.findById(apartmentID);

    if (!apartmentExists) {
      return res.status(404).json({ message: "Apartment not found" });
    } else {
      const review = await reviewModel.create({
        user: user._id,
        landlordRating,
        environmentRating,
        amenitiesRating,
        comments,
        apartment: apartmentExists?._id,
        image: secure_url,
        imageID: public_id,
      });

      apartmentExists.reviews.push(review._id);
      await apartmentExists.save();

      return res.status(201).json({
        message: "Review created successfully",
        data: review,
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { ID } = req.params;

    const review = await reviewModel.findById(ID);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const review = await reviewModel.find();
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const { ID } = req.params;

    const review = await reviewModel.findByIdAndUpdate(ID, req.body, {
      new: true,
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const { ID } = req.params;

    const review = await reviewModel.findByIdAndDelete(ID);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark review as helpful
exports.markReviewAsHelpful = async (req, res) => {
  try {
    const { ID } = req.params;

    const review = await reviewModel.findById(ID);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.helpfulCount += 1;
    await review.save();

    res
      .status(201)
      .json({ message: "One review marked as helpful successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for an apartment
exports.getReviewsForApartment = async (req, res) => {
  try {
    const { ID } = req.params;

    const reviews = await reviewModel.find({
      apartment: ID,
    });
    res
      .status(200)
      .json({ message: "Reviews under an apartment gotten", reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sortReviewsForApartmentByMostHelpful = async (req, res) => {
  try {
    const { ID } = req.params;

    const reviews = await reviewModel.find({ apartment: ID }).sort({
      helpfulCount: -1,
    });

    res.status(200).json({
      message: "Reviews under an apartment sorted by helpful count",
      reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sortReviewsForApartmentByMostRecent = async (req, res) => {
  try {
    const { ID } = req.params;

    const reviews = await reviewModel.find({ apartment: ID }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Reviews under an apartment sorted by most recent",
      reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
