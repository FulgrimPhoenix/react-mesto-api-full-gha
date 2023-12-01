export const errorController = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  if (statusCode === 500) {
    return res.status(statusCode).send({ message: "На сервере произошла ошибка" });
  }

  if (statusCode === 11000) {
    return res.status(statusCode).send({ message: "Пользователь с такими данными уже существет" });
  }

  res.status(statusCode).send({message: message});
};
