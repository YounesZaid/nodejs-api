const express = require("express");
const morgan = require("morgan");
const { getPosts } = require("./routes/post");

const app = express();
app.use(morgan("dev"));

app.get("/", getPosts);

const port = 8080;
app.listen(port, () => {
  console.log(`Api server is running on port : ${port}`);
});
