var express = require("express");
var router = express.Router();
const auth_controller = require("../controllers/auth-controller");
const index_page_controller = require("../controllers/index-page-controller");
const message_controller = require("../controllers/messsage-controller");
const user_controller = require("../controllers/user-controller");
/* GET home page. */
router.get("/", index_page_controller.index);

router.get("/sign-up", auth_controller.sign_up_get);
router.post("/sign-up", auth_controller.sign_up_post);
router.get("/login", auth_controller.login_get);
router.post("/login", auth_controller.log_in_post);
router.get("/logout", auth_controller.log_out_get);
router.get("/authenticated", auth_controller.check_authentication);

router.get("/create-message", message_controller.message_create_get);
router.post("/create-message", message_controller.message_create_post);

router.get("/member", user_controller.create_member_get);
router.post("/member", user_controller.create_member_post);

module.exports = router;
