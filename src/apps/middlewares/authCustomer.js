const jwt = require("jsonwebtoken");
const config = require("config");
const { redisClient } = require("../../common/init.redis");
module.exports = async (req, res, next) => {
  try {
    const verifyToken = req.headers["token"];

    if (!verifyToken) {
      return res.status(401).json("Authentication required");
    } 
    else {
      const accessToken = verifyToken.split(" ")[1];
      // Check Dirty token
      const dirtyToken = await redisClient.get(accessToken);
      if (dirtyToken) return res.status(401).json("Dirty token");

      // Verify token
      jwt.verify(
        accessToken,
        config.get("app.jwtAccessKey"),
        (err, decoded) => {
          if (err) {
            return res.status(401).json("Authentication required");
          }
          next();
        }
      );
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
