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
    } else if (req.body.passcode === "hehe") {
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
