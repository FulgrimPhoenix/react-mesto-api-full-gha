import { likeCard, dislikeCard, getCards, deleteCard, postCard } from "../controllers/cardsUtils.js";
import { Router } from "express";
import { celebrate, Joi } from "celebrate";

export const cardsRouter = Router();

cardsRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().uri().required().pattern(/^https?:\/\//),
    }),
  }),
  postCard
);

cardsRouter.delete(
  "/:cardId",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).pattern(/\w+$/),
    }),
  }),
  deleteCard
);

cardsRouter.get('/', getCards);

cardsRouter.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).pattern(/\w+$/),
    }),
  }),
  likeCard
);

cardsRouter.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).pattern(/\w+$/),
    }),
  }),
  dislikeCard
);