const express = require("express");
const session = require("express-session");
const serverless = require("serverless-http");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const { COOKIE_KEY, MONGO_URL } = require("./utils/config");

require("./utils/passport");
require("./utils/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// load session data and make it available at `req.session`
app.use(
  session({
    name: "test",
    secret: COOKIE_KEY,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 90 },
  })
);

// initialize passport and authenticate the request based on session
// data.
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use("/auth", authRoutes);

module.exports.handler = serverless(app);
