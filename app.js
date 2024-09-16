require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const usersRouter = require("./routes/usersRoutes");
const expressionsRouter = require("./routes/expressionsRoutes");
const eventsRouter = require("./routes/eventsRoutes");
const userProgramsRouter = require("./routes/userProgramsRoutes");
const decksRouter = require("./routes/decksRoutes");
const userMetaRouter = require("./routes/userMetaRoutes");
const csrfProtection = require("./middlewares/csrfMiddleware");
const { authenticateToken } = require("./middlewares/userAuth");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Configuration des middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authenticateToken);
// app.use(csrfProtection);

// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

app.use("/", usersRouter);
app.use("/", expressionsRouter);
app.use("/", eventsRouter);
app.use("/", userMetaRouter);
app.use("/", userProgramsRouter);
app.use("/", decksRouter);

module.exports = app;
