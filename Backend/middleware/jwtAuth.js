// import module.................................

const JWT = require("jsonwebtoken");
// ......JWT/...................................
const jwtAuth = (req, res, next) => {
  // verify token
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    req.user = {
      id: payload.id,
      email: payload.email,
    };
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
  next();
};

// .................. export it to use wherever needed

module.exports = jwtAuth;
