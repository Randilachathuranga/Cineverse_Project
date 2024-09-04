const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    const { username, password, name, email, phone, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      username,
      password,
      email,
      name,
      phone,
      role,
    });

    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error occurred", err });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token and user ID
    res.json({ token, _id: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get user details by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Update user details by ID
exports.updateUser = async (req, res) => {
  try {
    const { username, email, name, phone, role,password } = req.body;

    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, name, phone, role ,password}, // Update role if provided
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
