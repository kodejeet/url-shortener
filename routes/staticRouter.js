const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const User = require("../models/user");


router.get("/", async(req, res) => {
  if(!req.user) return res.redirect('/login');

  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const baseUrl = `${protocol}://${req.get("host")}`;
  const allUrls = await URL.find({ createdBy: req.user._id });

  var userName = "";
  try {
    const userDoc = await User.findById(req.user._id);
    if (userDoc) userName = userDoc.name;
  } catch (e) {}

  return res.render("html", {
    urls: allUrls,
    baseUrl: baseUrl,
    userName: userName,
  });
});

router.get('/signup', (req, res) => {
  return res.render('signup');
});

router.get('/login', (req, res) => {
  return res.render('login');
});

module.exports = router;
