const allowedDomens = [
  "http://localhost:3000",
  "http://garazhelka.nomoredomainsmonster.ru",
  "https://garazhelka.nomoredomainsmonster.ru",
];

function checkCORS(req, res, next) {
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  if (allowedDomens.includes(origin)) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Expose-Headers", "*");
    res.status(200);
  }

  if(method === "OPTIONS"){
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    res.status(200);
    return res.end();
  }

  next();
}

module.exports = checkCORS;
