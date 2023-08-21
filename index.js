require('dotenv').config()
const express = require("express");
const session = require("express-session");
const  cookieParser = require('cookie-parser')
const path = require("path");
const hbs = require("hbs");
const bcrypt = require('bcrypt')


const app = express();
const router = require("./routes/routes");

const port = 8000;

require("./connection/dbconn");
const Msg = require("./models/msgschema");
const { log } = require('console');

const staticpath = path.join(__dirname, "/public");
const partialpath = path.join(__dirname, "/partials");
const viewspath = path.join(__dirname, "/views");





app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key", // Replace with your secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static(staticpath));
app.use(router);

app.set("view engine", "hbs");

hbs.registerPartials(partialpath);




app.listen(port, () => {
  console.log(`app is listening at port:${port}`);
});







