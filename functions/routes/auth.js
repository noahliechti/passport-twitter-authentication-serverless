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
router.get("/success", (res, req) => {
  console.log("success redirect", req.url);
  res.redirect(BASE_URL);
});

router.get(
  "/redirect",
  passport.authenticate("twitter", {
    successRedirect: "/success", // TODO: can I just use "/"
    failureRedirect: BASE_URL,
  })
);

module.exports = router;
