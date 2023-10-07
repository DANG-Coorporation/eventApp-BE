const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
  });
};

module.exports = errorHandlerMiddleware;
