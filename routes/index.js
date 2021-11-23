const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const signoutRouter = require('./signout');
const auth = require('../middlewares/auth');
const CustomError = require('../errors/CustomError');

const pageNotFoundError = new CustomError(404, 'Запрашиваемый ресурс не найден', 'pageNotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/signout', signoutRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.all('*', auth, (req, res, next) => {
  next(pageNotFoundError);
});

module.exports = router;
