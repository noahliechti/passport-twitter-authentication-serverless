exports.BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8888"
    : process.env.BASE_URL;

exports.COOKIE_KEY = process.env.COOKIE_KEY || "SUPERSECRET";

exports.ENDPOINT =
  process.env.NODE_ENV === "development" ? "/.netlify/functions" : "/api";

exports.TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
exports.TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

exports.MONGO_URL =
  process.env.NODE_ENV === "development"
    ? `mongodb://localhost/userDB`
    : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@users.s9tkz.mongodb.net/UserDB?retryWrites=true&w=majority`;
