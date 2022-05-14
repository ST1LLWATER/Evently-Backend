require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  // const token = req.cookies.access_token;
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    console.log("Token Not Found");
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(data);
    req.rollNo = data.rollNo;
    req.role = data.role;
    return next();
  } catch (err) {
    console.log("Error: ", err.message);
    return res.sendStatus(403);
  }
};

module.exports = authenticateToken;
