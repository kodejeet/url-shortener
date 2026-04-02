const shortid = require("shortid");
const URL = require("../models/url");
const User = require("../models/user");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const baseUrl = `${protocol}://${req.get("host")}`;
  const allUrls = await URL.find({ createdBy: req.user._id });

  var userName = "";
  try {
    const userDoc = await User.findById(req.user._id);
    if (userDoc) userName = userDoc.name;
  } catch (e) {}

  return res.render("html", {
    id: shortID,
    urls: allUrls,
    baseUrl: baseUrl,
    userName: userName,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};

