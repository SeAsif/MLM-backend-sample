const { sign } = require('jsonwebtoken');

const createAccessToken = userId => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const createRefreshToken = userId => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const setRefreshTokenToCookie = (res, refreshToken) => {
  res.cookie('jid', refreshToken, {
    httpOnly: true,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  setRefreshTokenToCookie,
};
