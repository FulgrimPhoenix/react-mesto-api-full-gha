const errorController = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  if (code === 11000) {
    return res
      .status(statusCode)
      .send({ message: "Пользователь с такими данным уже существует" });
  }

  if (statusCode === 500) {
    console.log(err);
    return res
      .status(statusCode)
      .send({ message: "На сервере произошла ошибка" });
  }

  res.status(statusCode).send({ message: message });
};

module.exports = {
  errorController,
};
