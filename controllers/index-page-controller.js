const User = require("../models/userModel");
exports.index = function (req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("index", { title: "Express", user: req.user });
};
