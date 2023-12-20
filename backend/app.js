const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const router = require('./routes/app.js')
const { errorController } = require('./controllers/errorController.js');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const { PORT = 3000, URL = "mongodb://0.0.0.0:27017/mestodb" } = process.env;

mongoose
  .connect(URL)
  .then(() => console.log('Connected to data base'))
  .catch((err) => console.log(`We have some troubles: ${err}`))

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server listening PORT:${PORT}`);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorController);

// включение ES6 импортов: --experimental-modules --es-module-specifier-resolution=node --trace-warnings --inspect --