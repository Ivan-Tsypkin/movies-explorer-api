require('dotenv').config();

const { PORT = 3000 } = process.env;
const { JWT_SECRET = 'qwertyasdfgh' } = process.env;
const { MONGODB_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;
// eslint-disable-next-line no-useless-escape
const RegExpForUrl = /(https?:\/\/)?(www\.)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*[\/\#]?/;

const corsOptions = { // Подключить опции в app после разработки фронта
  origin: [
    'http://localhost:3000',
    'https://antares.nomoredomains.xyz',
    'http://antares.nomoredomains.xyz',
  ],
  methods: ['GET', 'PUT', 'PATCH', 'HEAD', 'POST', 'DELETE'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  PORT,
  JWT_SECRET,
  MONGODB_URL,
  RegExpForUrl,
  corsOptions,
};
