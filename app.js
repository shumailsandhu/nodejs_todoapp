const express = require("express");
const userRouter = require("./routes/user.js");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/task.js");
const { errorMiddleware } = require("./middlewears/error.js");
const cors = require("cors");

const app = express();

config({
  path: "./database/config.env",
});

//Middle Wares

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

//Using Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

module.exports = app;

//Using Error Middleware
app.use(errorMiddleware);
