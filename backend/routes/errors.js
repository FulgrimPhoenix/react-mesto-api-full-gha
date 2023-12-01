import { Router } from "express";
import { NotFoundError } from "../errors/errors";

const errorPath = Router();

errorPath.use("/:voidrequest", (req, res, next) => {
  try {
    throw new NotFoundError("страница не найдена");
  } catch (error) {
    next(error);
  }
});

export default errorPath;
