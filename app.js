const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRouter");
const appRouter = require("./router/appRouter");

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//app router
app.use("/api/app", appRouter);

// User Route
app.use("/api/user", userRouter);

module.exports = app;
