const canCreateEvent = (req, res, next) => {
  console.log(req.session.User);
  if (req.session?.User?.role?.contains('admin')) {
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: '',
  });
};

module.exports = canCreateEvent;
