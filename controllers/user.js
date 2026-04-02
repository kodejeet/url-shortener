const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");
const URL = require("../models/url");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    console.log("Signup req.body:", req.body);

    if (!name || !email || !password) {
      return res.status(400).render("signup", {
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).render("signup", {
        error: "An account with this email already exists",
      });
    }

    await User.create({ name, email, password });

    return res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).render("signup", {
      error: "Something went wrong. Please try again.",
    });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Login req.body:", req.body);

    if (!email || !password) {
      return res.status(400).render("login", {
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).render("login", {
        error: "Invalid Username or Password",
      });
    }

    const token = setUser(user);
    res.cookie("uid", token);

    return res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).render("login", {
      error: "Something went wrong. Please try again.",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};