const { Router } = require("express");
const {
  createReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  markReviewAsHelpful,
  getReviewsForApartment,
  getReviews,
  sortReviewsForApartmentByMostHelpful,
  sortReviewsForApartmentByMostRecent,
} = require("../controllers/reviewController");
const multer = require("multer");

const router = Router();

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("reviewImg");

router.route("/create-review/:userID/:apartmentID").post(upload, createReview);

router.route("/get-review/:ID").get(getReviewById);
router.route("/apartment-reviews/:ID").get(getReviewsForApartment);
router.route("/get-reviews").get(getReviews);
router
  .route("/apartment-reviews/:ID/most-helpful")
  .get(sortReviewsForApartmentByMostHelpful);
router
  .route("/apartment-reviews/:ID/most-recent")
  .get(sortReviewsForApartmentByMostRecent);

router.route("/update-review/:ID").patch(updateReviewById);
router.route("/mark-review-as-helpful/:ID").patch(markReviewAsHelpful);

router.route("/delete-review/:ID").delete(deleteReviewById);

module.exports = router;
