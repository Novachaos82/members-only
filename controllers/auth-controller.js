const User = require("../models/userModel");
const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.sign_up_get = function (req, res, next) {
  res.render("sign-up-form", { title: "Sign Up" });
};

exports.login_get = function (req, res, next) {
  res.render("login-form", { title: "Log In" });
};

exports.sign_up_post = [
  body("username", "username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password must not be empty.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("confirmPassword", "passwords do not match")
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password),
  async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      member: false,
      admin: false,
    });
    if (!errors.isEmpty()) {
      res.render("sign-up-form", { errors: errors.array() });
    } else {
      try {
        await user.save();
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  },
];

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/sign-up",
});

exports.log_out_get = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
exports.check_authentication = (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
  if (req.isAuthenticated()) {
    res.send(
      '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
    );
  } else {
    res.send(
      '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>'
    );
  }
};
