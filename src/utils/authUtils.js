const { verify } = require('jsonwebtoken');
const { errorResponse } = require('./responseUtils');

const isAuth = (req, res, next) => {
  // grab access token from request header
  const authorization = req.headers['authorization'];

  // check if we have an access token
  if (!authorization) return errorResponse(res, 'No user logged in or No access');

  // if we do have an access token verify it.
  try {
    const token = authorization.split(' ')[1];

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.userId;
  } catch (err) {
    return errorResponse(res, 'Error trying to authenticate user', err);
  }
  return next();
};

module.exports = { isAuth };
