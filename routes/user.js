const express = require("express");
const User = require("../models/user.js");
const {
  register,
  getMyProfile,
  login,
  logout,
} = require("../controllers/user.js");
const isAuthenticated = require("../middlewears/auth.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Shumail Smasher");
});

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
