exports.login = (req, res, next) => {
  console.log("in login");
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.send("cookie sets");
};
