const { likeCard, dislikeCard, getCards, deleteCard, postCard } = require("../controllers/cardsUtils.js");
const { Router } = require("express");
const { celebrate, Joi } = require("celebrate");

const cardsRouter = Router();

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

module.exports = {
  cardsRouter
}