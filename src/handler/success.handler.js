const successHandler = (statusCode, successMessage, res, data) => {
  try {
    res.status(statusCode).send({ status: statusCode, message: successMessage, data: data });
  } catch (error) {
    res.status(500).send({ status: 400, message: 'Server error occurred' });
  }
};


export default successHandler;
