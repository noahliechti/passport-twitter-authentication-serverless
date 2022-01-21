const router = require("express").Router();
const passport = require("passport");
const { BASE_URL } = require("../utils/config");

router.get("/", (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(BASE_URL);
});

router.get("/login", passport.authenticate("twitter"));

router.get(
  "/redirect",
  passport.authenticate("twitter", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log("success redirect", req.url);
    res.redirect("/");
  }
);

module.exports = router;
