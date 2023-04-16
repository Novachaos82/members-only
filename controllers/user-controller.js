const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

exports.create_member_get = async (req, res, next) => {
  res.render("member-form", { title: "Become a Member Now", user: req.user });
};

exports.create_member_post = [
  body("passcode").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("member-form", {
        title: "Become a Member",
        user: req.user,
        errors: errors.array(),
      });
    } else if (req.body.passcode === process.env.MEMBER_PASS) {
      try {
        await User.findByIdAndUpdate(req.user._id, { member: true });
        res.redirect("/");
      } catch (err) {
        next(err);
      }
    } else {
      res.render("member-from", {
        title: "Become a member",
        user: req.user,
        errors: [{ msg: "Invalid passcode" }],
      });
    }
  },
];

exports.create_admin_get = async (req, res, next) => {
  res.render("admin-form", { title: "Become an Admin Now", user: req.user });
};

exports.create_admin_post = [
  body("passcode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("wrong passcode "),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("admin-form", {
        title: "Become an Admin",
        user: req.user,
        errors: errors.array(),
      });
    } else if (req.body.passcode === process.env.ADMIN_PASS) {
      try {
        await User.findByIdAndUpdate(req.user._id, { admin: true });
        res.redirect("/");
      } catch (err) {
        next(err);
      }
    } else {
      res.render("admin-from", {
        title: "Become an admin",
        user: req.user,
        errors: [{ msg: "Invalid passcode" }],
      });
    }
  },
];
