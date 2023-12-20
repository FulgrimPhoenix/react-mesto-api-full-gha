const { NotFoundError, accessError } = require("../errors/errors.js");
const card = require("../models/card.js");

const getCards = (req, res, next) => {
  return card
    .find({})
    .then((cards) => {
      return res.status(200).json(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("карточка с данным id не найдена");
      }
      if (card.owner.toString() === req.user._id) {
        return card
          .findByIdAndDelete(req.params.cardId)
          .then((card) => {
            return res.status(200).json(card);
          })
          .catch(next);
      }
      throw new accessError("доступ отсутствует");
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  req.body.owner = { _id: req.user._id };
  const newCard = new card(req.body);
  newCard
    .save()
    .then((result) => {
      return res.status(201).json({ _id: result._id });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("карточка не найдена");
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("карточка не найдена");
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  postCard,
  likeCard,
  dislikeCard,
};
