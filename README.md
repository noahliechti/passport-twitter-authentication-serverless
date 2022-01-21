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

> Running the App in production requires you to set Network Access in MongoDB to allow access from everywhere.
