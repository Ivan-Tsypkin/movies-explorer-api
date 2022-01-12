const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
