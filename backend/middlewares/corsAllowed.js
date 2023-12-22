const allowedDomens = ["localhost:3000"];

function checkCORS(req, res, next) {
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];

  if (allowedDomens.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    // разрешаем кросс-доменные запросы с этими заголовками
    res.set({
      "Access-Control-Allow-Methods": DEFAULT_ALLOWED_METHODS,
      "Access-Control-Allow-Headers": requestHeaders,
    });
  }

  next();
}

module.exports = checkCORS;
