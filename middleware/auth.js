const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    // pass to req object the aut attr to verify the connected one who wants to delete a product
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user id  !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Unauthorized request!" });
  }
};
