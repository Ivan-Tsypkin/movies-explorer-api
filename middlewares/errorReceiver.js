/* eslint-disable no-console */
module.exports.errorReceiver = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  console.log(`Error:${err.name}`);

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Данный E-mail уже зарегистрирован!';
    return res.status(statusCode).send({ message });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
};
