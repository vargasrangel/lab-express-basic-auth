// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');
// ℹ️ Connects to the database
require('./db');
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

//requerimos mongo-connect

const MongoStore = require("connect-mongo")

const app = express();

const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy

app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 6000000 // 60 * 1000 ms === 1 min
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/basic-auth'

        // ttl => time to live
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      })
    })
  );


// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);



// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
//lo que dice: entrar a localhost:3000
const index = require('./routes/index');
app.use('/', index);
