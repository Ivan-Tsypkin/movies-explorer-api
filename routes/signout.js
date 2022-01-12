const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  }).send({ message: 'Выход' });
});

module.exports = router;
