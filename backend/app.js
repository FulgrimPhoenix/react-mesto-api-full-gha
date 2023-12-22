const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const router = require('./routes/app.js')
const { errorController } = require('./controllers/errorController.js');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const checkCORS = require('./middlewares/corsAllowed.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());


const { PORT = 3001, URL = "mongodb://0.0.0.0:27017/mestodb" } = process.env;

mongoose
  .connect(URL)
  .then(() => console.log('Connected to data base'))
  .catch((err) => console.log(`We have some troubles: ${err}`))

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server listening PORT:${PORT}`);
});

app.use(requestLogger);
app.use(checkCORS);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorController);

// включение ES6 импортов: --experimental-modules --es-module-specifier-resolution=node --trace-warnings --inspect --