const jwt = require("jsonwebtoken");
const { AuthError } = require("../errors/errors");
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      throw new AuthError("Необходима авторизация");
    }

    const token = req.cookies.jwt;

    let payload;
    try {
      payload = jwt.verify(
        token,
        NODE_ENV === "production" ? JWT_SECRET : "secret"
      );
    } catch {
      throw new AuthError("Необходима авторизация");
    }
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth
}
