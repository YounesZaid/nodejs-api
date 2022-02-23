const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

const port = 8080;
app.listen(port, () => {
  console.log(`Api server is running on port : ${port}`);
});
