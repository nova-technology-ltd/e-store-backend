const jwt = require("jsonwebtoken");

const accessTokneValidator = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({
            title: "Unauthorized",
            message: "You are not authorized for this action",
          });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    }
  } catch (e) {
    res.status(500).json({
      title: "Server Error",
      message: `Server Error: ${e}`,
    });
  }
};

module.exports = accessTokneValidator;
