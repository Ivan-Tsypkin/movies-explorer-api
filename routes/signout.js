const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).clearCookie('jwt', {
    sameSite: 'none',
  }).send({ message: 'Выход' });
});

module.exports = router;
