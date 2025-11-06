const checkRole = (roles) => (req, res, next) => {
    !roles.includes(req.user.role)
      ? res.status(403).json("Interdit")
      : next();
  };
  
  module.exports = checkRole;