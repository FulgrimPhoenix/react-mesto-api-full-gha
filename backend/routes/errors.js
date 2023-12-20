const { Router } = require("express");
const { NotFoundError } = require("../errors/errors");

const errorPath = Router();

errorPath.use("/:voidrequest", (req, res, next) => {
  try {
    throw new NotFoundError("страница не найдена");
  } catch (error) {
    next(error);
  }
});

module.exports = errorPath;
