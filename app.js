var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var postsRouter = require("./routes/posts");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

var app = express();

// Database connection

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("We're connected to DB");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.disable("x-powered-by");

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/posts", postsRouter);

module.exports = app;
