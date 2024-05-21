const { Router } = require("express");
const multer = require("multer");
const {
  createApartment,
  getApartmentById,
  getAllApartments,
  deleteApartmentById,
} = require("../controllers/apartmentController");

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
}).single("apartmentImg");

router.route("/create-apartment/:ID").post(upload, createApartment);

router.route("/get-apartment-by-id/:ID").get(getApartmentById);
router.route("/get-all-apartments").get(getAllApartments);

router.route("/delete-apartment-by-id/:ID").delete(deleteApartmentById);

module.exports = router;
