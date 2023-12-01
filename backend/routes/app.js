import { Router } from "express";
import {usersRouter} from "./usersRouter.js";
import {cardsRouter } from "./cardsRouter.js";
import errorPath from "./errors.js";
import { login } from "../controllers/login.js";
import {createUser} from "../controllers/usersUtils.js";
import { auth } from "../middlewares/auth.js";
import { celebrate, Joi } from "celebrate";

const router = Router();

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().pattern(/^https?:\/\//),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser
);

router.use("/users", auth, usersRouter);
router.use("/cards", auth, cardsRouter);
router.use("/", errorPath);

export default router;
