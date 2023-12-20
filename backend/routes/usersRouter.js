const { getMyUserInfo, getUserById, getUsers, patchUser, patchUserAvatar} = require('../controllers/usersUtils.js');
const { celebrate, Joi } = require("celebrate");
const { Router } = require('express');

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.get(
  "/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).pattern(/\w+$/),
    }),
  }),
  getUserById
);

usersRouter.get("/me", getMyUserInfo);

usersRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().required().pattern(/^https?:\/\//)
    }).unknown(true),
  }),
  patchUserAvatar
);

usersRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  patchUser
);

module.exports = {
  usersRouter
}