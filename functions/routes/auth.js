const router = require("express").Router();
const passport = require("passport");
const { BASE_URL } = require("../utils/config");

router.get("/", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post("/logout", (req, res) => {
  req.logout();
  res.redirect(BASE_URL);
});

router.post("/login", passport.authenticate("twitter"));

router.get(
  "/redirect",
  passport.authenticate("twitter", {
    successRedirect: BASE_URL,
    failureRedirect: BASE_URL,
  })
);

module.exports = router;
