/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/requestsLimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorReceiver } = require('./middlewares/errorReceiver');

const { MONGODB_URL, PORT } = require('./utils/constants');

const app = express();

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(cors()); // Добавить опции после разработки фронта
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorReceiver);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
