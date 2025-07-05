const express = require("express");
const router = express.Router();
const URL = require("../models/url");


router.get("/", async(req, res) => {
    const allUrls = await URL.find({});
  return res.render("html", {
    urls: allUrls
  });
});

module.exports = router;
