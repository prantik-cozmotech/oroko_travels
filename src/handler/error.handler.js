const errorHandler = (statusCode, errorMessage, res, data) => {
  try {
    return res.status(statusCode).send({ status: statusCode, message: errorMessage, data: data });
  } catch (error) {
    return res.status(500).send({ status: 400, message: 'Server error occurred' });
  }
};


export default errorHandler;
