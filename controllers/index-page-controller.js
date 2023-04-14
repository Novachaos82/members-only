const User = require("../models/userModel");
const Message = require("../models/messageModel");
exports.index = async (req, res, next) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  const messages = await Message.find()
    .sort([["date", "descending"]])
    .populate("user");
  //console.log(messages);
  res.render("index", { title: "Express", user: req.user, message: messages });
};
