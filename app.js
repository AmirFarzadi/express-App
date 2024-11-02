const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app.main");
const dbdebug = require("debug")("app.db");
const usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");
// Config
// console.log(config.get("name"));
// console.log(config.get("SMS"));
// console.log(config.get("SMS.ip"));
// console.log(config.get("SMS.key"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.set("view engine", "ejs");
app.set("views", "./views");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}
dbdebug("Database connected...");

app.use("/api/users", usersRouter);
app.use("/", homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
