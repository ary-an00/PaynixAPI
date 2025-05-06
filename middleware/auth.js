const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    console.log(token); // Log the token for debugging
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log(decoded); // Log the decoded token for debugging

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
