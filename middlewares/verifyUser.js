const verifyUser = (req, res, next) => {
  if (req.session.User) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "User Is Not Logged In", success: false });
  }
};

module.exports = verifyUser;
