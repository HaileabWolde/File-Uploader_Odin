require("dotenv").config(); // ← must be first line before anything else
const path = require("node:path");
const express = require("express");
const expressSession = require('express-session');

const { PrismaPg } = require('@prisma/adapter-pg');  // For other db adapters, see Prisma docs
const { PrismaClient } = require('./generated/prisma/client');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');

 // DATABASE_URL defined in env file included in prisma.config.js; see Prisma docs
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/indexRouter');

const passport = require("passport");

// === Session Middleware ===
app.use(expressSession({
  store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    ),
  secret: process.env.FOO_COOKIE_SECRET,
    resave: true,
   saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));


require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use("/", indexRouter);
app.use((req,res)=>{
    res.status(400).send('Page not found')
})

// Keep this as is for real server errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).render("partials/errorPage");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
