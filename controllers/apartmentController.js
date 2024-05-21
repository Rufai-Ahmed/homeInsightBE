const apartmentModel = require("../models/apartmentModel");
const userModel = require("../models/userModel");
const { streamUpload } = require("../utils/streamifier");

// Create apartment

exports.createApartment = async (req, res) => {
  try {
    const { ID } = req.params;

    const { name, location, amenities } = req.body;

    const { secure_url, public_id } = await streamUpload(req);

    const user = await userModel.findById(ID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.landlord) {
      return res
        .status(403)
        .json({ message: "Only landlords can create apartments" });
    }

    const apartment = await apartmentModel.create({
      name,
      location,
      landlord: user?._id,
      amenities,
      image: secure_url,
      imageID: public_id,
    });

    res.status(201).json({
      message: "Apartment created successfully",
      data: apartment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get apartment by ID
exports.getApartmentById = async (req, res) => {
  try {
    const { ID } = req.params;

    const apartment = await apartmentModel.findById(ID).populate("reviews");
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete apartment by ID
exports.deleteApartmentById = async (req, res) => {
  try {
    const { ID } = req.params;
    const apartment = await apartmentModel.findByIdAndDelete(ID);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.json({ message: "Apartment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all apartments
exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await apartmentModel.find().populate("reviews");
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
