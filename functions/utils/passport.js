const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/user");
const {
  BASE_URL,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} = require("./config");

// save user._id to session as req.session.passport.user = '..'
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user); // attach user object to the request as req.user
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: `${BASE_URL}/.netlify/functions/auth/redirect`,
    },
    async (token, tokenSecret, profile, done) => {
      const profileData = profile._json;

      // find current user in UserModel
      let currentUser = await User.findOne({ _id: profileData.id });
      // if user already exist then update user fields
      if (currentUser) {
        const user = {
          _id: profileData.id,
          name: profileData.name,
          screenName: profileData.screen_name,
          photo: profileData.profile_image_url,
          verified: profileData.verified,
        };
        await User.updateOne({ _id: profileData.id }, { $set: user });
      } else {
        // create new user if the database doesn't have this user
        currentUser = await new User({
          _id: profileData.id,
          name: profileData.name,
          screenName: profileData.screen_name,
          photo: profileData.profile_image_url,
          verified: profileData.verified,
        }).save();
      }
      done(null, currentUser);
    }
  )
);
