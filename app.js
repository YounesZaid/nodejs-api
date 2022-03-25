const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");

// POST Routes
const postRoutes = require("./routes/post");
// PRODUCT Routes
const productRoutes = require("./routes/product");
// Items Routes QUIZ
const itemsRoutes = require("./routes/item");
// user auth routes
const userRoutes = require("./routes/user");
// Habit  routes
const habitRoutes = require("./routes/habit");

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

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
/** Middleware route to handle all post crud requests get/post ... */
app.use("/api", productRoutes);
app.use("/api/habit", habitRoutes);
app.use("/api/post", postRoutes);
app.use("/api/item", itemsRoutes);
app.use("/api/auth", userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Api server is running on port : ${port}`);
});
