exports.login = (req, res, next) => {
  console.log("in login");
  req.session.isLoggedIn = true;
};
