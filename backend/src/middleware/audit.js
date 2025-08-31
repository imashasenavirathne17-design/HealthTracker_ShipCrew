export const audit = (action) => (req, res, next) => {
  req.audit = { action, by: req.user?._id, at: new Date(), ip: req.ip };
  next();
};
