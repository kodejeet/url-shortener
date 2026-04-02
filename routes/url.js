const express = require('express');
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url"); 
const URL = require("../models/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.post("/clear-all", async (req, res) => {
  await URL.deleteMany({ createdBy: req.user._id });
  return res.redirect("/");
});

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;