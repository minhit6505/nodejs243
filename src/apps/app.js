const express = require("express");
const session = require("express-session");
const app = express();
const config = require("config");
const cookieParser = require("cookie-parser");
const {connectionRedis} = require("../common/init.redis");
connectionRedis();

// config form data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// config session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("app.sessionKey"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
// config cookie
app.use(cookieParser());

// Config template ejs
app.set("views", config.get("app.viewsFolder"));
app.set("view engine", config.get("app.viewEngine")); 

// Config static folder
app.use("/static", express.static(config.get("app.staticFolder")));

// Config images folder
app.use("/asset/upload/images", express.static(config.get("app.baseImageUrl"))); 

// Config router
app.use(require(config.get("app.router")));
app.use(config.get("app.prefixApiVersion"), require("../routers/api"));
module.exports = app;
