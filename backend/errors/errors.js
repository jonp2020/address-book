exports.handleInvalidPath = (req, res, next) => {
  res.status(404).send({
    msg: "This page does not exist. Please check the url you have entered.",
  });
};

exports.handle405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

exports.customErrorHandler = (err, req, res, next) => {
  if (err) {
    const { status, msg } = err;
    res.status(status).send(msg);
  } else next(err);
};

exports.send500Error = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
};
