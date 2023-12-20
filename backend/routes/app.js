const { Router } = require("express");
const {usersRouter} = require("./usersRouter.js");
const {cardsRouter } = require("./cardsRouter.js");
const errorPath = require("./errors.js");
const { login } = require("../controllers/login.js");
const {createUser} = require("../controllers/usersUtils.js");
const { auth } = require("../middlewares/auth.js");
const { celebrate, Joi } = require("celebrate");

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

module.exports = router;
