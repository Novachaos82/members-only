var express = require("express");
var router = express.Router();
const auth_controller = require("../controllers/auth-controller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", auth_controller.sign_up_get);
router.post("/sign-up", auth_controller.sign_up_post);
router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.log_in_post);
router.get("/logout", auth_controller.log_out_get);
router.get("/authenticated", auth_controller.check_authentication);
module.exports = router;
