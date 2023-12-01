const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRouter");

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PATCH,DELETE",
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// User Route
app.use("/api/user", userRouter);

module.exports = app;
