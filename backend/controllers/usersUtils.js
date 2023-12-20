const { NotFoundError } = require("../errors/errors.js");
const user = require("../models/user.js");
const bcryptjs = require("bcryptjs");

const createUser = (req, res, next) => {
  bcryptjs.hash(req.body.password, 10).then((hash) => {
    const newUser = new user({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    });

    return newUser
      .save()
      .then((user) => {
        res.status(201).json({
          _id: user._id,
          email: user.email,
        });
      })
      .catch(next);
  });
};

const getMyUserInfo = (req, res, next) => {
  user
    .findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("страница не найдена");
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  user
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("ползователь не найден");
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Страница не найдена");
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

const patchUserAvatar = (req, res, next) => {
  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      {
        new: true,
        runValidators: true,
      }
    )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("страница не найдена");
      }
      res.status(200).json(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  getMyUserInfo,
  getUserById,
  getUsers,
  patchUser,
  patchUserAvatar,
};
