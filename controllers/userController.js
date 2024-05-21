const userModel = require("../models/userModel");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.create({ username, email, password });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { ID } = req.params;
    const user = await userModel.findById(ID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "One user found successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res
      .status(200)
      .json({ message: "All users found successfully", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { ID } = req.params;

    const user = await userModel.findByIdAndUpdate(ID, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user to landlord by ID
exports.updateUserToLandlordById = async (req, res) => {
  try {
    const { ID } = req.params;

    const user = await userModel.findByIdAndUpdate(
      ID,
      { landlord: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated to landlord successfully", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { ID } = req.params;

    const user = await userModel.findByIdAndDelete(ID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
