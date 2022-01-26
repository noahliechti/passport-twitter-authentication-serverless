# Serverless Passport.js Twitter Authentication

[![Netlify Status](https://api.netlify.com/api/v1/badges/78d26e11-70d9-4eb7-9cd3-2c9434698841/deploy-status)](https://app.netlify.com/sites/serverless-twitter-login/deploys)
[![Live Demo](https://img.shields.io/badge/Live Preview-Click Me-green.svg?style=social)](https://serverless-twitter-login.netlify.app/)

Sessions are stored in MongoDB.

## Requirements

- Twitter Dev Account
  - Callback URL set to `https://your-app.netlify.app/auth/redirect` and `http://localhost:4000/auth/redirect`
- MongoDB installed locally and MongoDB Atlas Account
- Netlify Account that is connected to your GitHub project
  - set publish directory to `src`
- Install Netlify cli with `npm i -g netlify-cli`

## Environment Variables

Set the environment variables in Netlify.

| ENV Variable            | Example Value        | Description                       |
| ----------------------- | -------------------- | --------------------------------- |
| BASE_URL                | your-app.netlify.app | The Link of your production app   |
| MONGO_PW                | very_securePW123     | User credentials of MongoDB       |
| MONGO_USER              | user1                | User credentials of MongoDB       |
| COOKIE_KEY              | very_random_text     | Choose something secure           |
| TWITTER_CONSUMER_KEY    |                      | Get it from twitter dev dashboard |
| TWITTER_CONSUMER_SECRET |                      | Get it from twitter dev dashboard |

## Start the APP

- run `npx netlify login` and `npx netlify link` to link our local directory to the remote Netlify project. with this method it will automatically inject the environment variables from Netlify.
- Run `npm run serve`

## Important

### Netlify query params

Netlify has a [new "feature"](https://answers.netlify.com/t/changes-to-redirects-with-query-string-parameters-are-coming/23436) where they automatic pass through query string parameters. This is bad because after the user logged in he will then see his credentials in the URL like this: `https://serverless-twitter-login.netlify.app/?oauth_token=xyz&oauth_verifier=xyz`
We had to make a little hack to remove the query params where we make a redirect to `/?success`, because we can not redirect to the same page.

```text
[[redirects]]
  from = "/*"
  to = "/:splat/?success"
  query = {oauth_token = ":token", oauth_verifier = ":verifier"}
  force = true
```

### MongoDB Production (security advice)

> Running the App in production requires you to set Network Access in MongoDB to allow access from everywhere. Consider using [VPC Peering](https://www.youtube.com/watch?v=kWhIwlNkZm4)
