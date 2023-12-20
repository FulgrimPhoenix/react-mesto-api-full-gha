const user = require("../models/user");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret"
      );
      res.send({ jwt: token });
      // return res
      //   .cookie("jwt", token, {
      //     maxAge: 3600000,
      //     httpOnly: true,
      //   })
      //   .end();
    })
    .catch(next);
};

module.exports = {
  login,
};
