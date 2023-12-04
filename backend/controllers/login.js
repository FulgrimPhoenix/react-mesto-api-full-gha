import { AuthError } from "../errors/errors";
import user from "../models/user";
import jwt from "jsonwebtoken";
const { NODE_ENV, JWT_SECRET } = process.env;

export const login = (req, res, next) => {
  const { email, password } = req.body;

  user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret"
      );
      res.send({jwt: token})
    })
    .catch(next);
};
