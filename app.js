require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const app = express();

const usersRouter = require("./routes/usersRoutes");
const expressionsRouter = require("./routes/expressionsRoutes");
const eventsRouter = require("./routes/eventsRoutes");
const userProgramsRouter = require("./routes/userProgramsRoutes");
const decksRouter = require("./routes/decksRoutes");
const userMetaRouter = require("./routes/userMetaRoutes");

const { authenticateToken } = require("./middlewares/userAuth");

app.use(bodyParser.json());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use(authenticateToken);

app.use("/", usersRouter);
app.use("/", expressionsRouter);
app.use("/", eventsRouter);
app.use("/", userMetaRouter);
app.use("/", userProgramsRouter);
app.use("/", decksRouter);

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF Token" });
  }
  next(err);
});

module.exports = app;
