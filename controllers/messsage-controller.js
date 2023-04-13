const Message = require("../models/messageModel");
const async = require("async");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.message_create_get = function (req, res, next) {
  console.log(res.locals.currentUser);
  res.render("message-form", { title: "Create Message", user: req.user });
};

exports.message_create_post = [
  body("title", "title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("message", "message must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      user: req.user._id,
      date: Date.now(),
    });
    if (!errors.isEmpty()) {
      console.log(errors.array());
      res.render("message-form", {
        title: "Create Message",
        user: req.user,
        errors: errors.array(),
      });
    } else {
      try {
        await message.save();
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  },
];
