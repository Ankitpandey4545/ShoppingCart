// backend/controllers/AuthController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account Created.",
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Wrong email or password.",
      });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({
        success: false,
        message: "Wrong email or password.",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ✅ false on localhost
      sameSite: "lax", // ✅ 'lax' for localhost (instead of 'None')
      expires: new Date(Date.now() + 3600000),
    });

    res.status(200).json({
      success: true,
      message: "Login Successful.",
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // ✅ false on localhost
    sameSite: "lax", // ✅ lax for localhost
  });

  res.status(200).json({
    success: true,
    message: "Logout Successful.",
  });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ GetUser Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
};
