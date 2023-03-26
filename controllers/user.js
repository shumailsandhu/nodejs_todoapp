const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendCookie = require("../utils/features.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Invalid Email", 400));

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) return next(new errorHandler("incorrect Password", 400));

    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new errorHandler("User Alreadu Exist", 400));

    const hassedPasswored = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hassedPasswored });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: "true",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: "true",
        message: "Loged Out Successfully",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getMyProfile, login, logout };
