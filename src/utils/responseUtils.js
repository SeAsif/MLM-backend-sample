const successResponse = (res, message, data) => {
  res.json({
    status: true,
    message,
    data,
  });
};

const errorResponse = (res, message, error = null) => {
  res.json({
    status: false,
    message,
    error,
  });
};

module.exports = { successResponse, errorResponse };
