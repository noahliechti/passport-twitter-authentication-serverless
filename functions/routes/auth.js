const router = require("express").Router();
const passport = require("passport");
const { BASE_URL } = require("../utils/config");

router.get("/", (req, res) => {
  res.send({ status: "hello" });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(BASE_URL);
});

router.get("/login", passport.authenticate("twitter"));

router.get(
  "/redirect",
  passport.authenticate("twitter", {
    successRedirect: BASE_URL, // TODO: can I just use "/"
    failureRedirect: BASE_URL,
  })
);

module.exports = router;
