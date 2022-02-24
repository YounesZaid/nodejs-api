const express = require("express");
const morgan = require("morgan");
const postRoutes = require("./routes/post");

const app = express();

// Middleware to view executed routes
app.use(morgan("dev"));

/** Middleware route to handle all post requests get/post ... */
app.use("/", postRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Api server is running on port : ${port}`);
});
