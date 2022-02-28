const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const postRoutes = require("./routes/post");

const app = express();
dotenv.config();

// db config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db Connected ... "));
mongoose.connection.on("err", (err) =>
  console.log(`db Connection failed: ${err}`)
);

// Middleware to view executed routes
app.use(morgan("dev"));

// Middleware to parse body requests
app.use(bodyParser.json());

// Middleware to handle errors validator
app.use(expressValidator());

app.use(morgan("dev"));

/** Middleware route to handle all post requests get/post ... */
app.use("/", postRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Api server is running on port : ${port}`);
});
