const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app.main");
const dbdebug = require("debug")("app.db");
const usersRouter = require("./routes/users");
const homeRouter = require("./routes/home");
const mongoose = require("mongoose")
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

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/express-App")
  .then(() => console.log("MongoDB connected..."))
  .catch(() => console.error("Failed to connect to MongoDB"));

  
app.use("/api/users", usersRouter);
app.use("/", homeRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
