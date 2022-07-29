const User = require('../models/users');
const { verify } = require('jsonwebtoken');
const UserController = require('./UserController');
const {
  createRefreshToken,
  createAccessToken,
  setRefreshTokenToCookie,
} = require('../utils/tokensUtils');
const { errorResponse, successResponse } = require('../utils/responseUtils');
const { comparePassword, hashPassword } = require('../utils/utils');
const UtilsController = require('./UtilsController');

let AuthController = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      await User.findOne({ email: email }, async (err, user) => {
        if (err) return errorResponse(res, 'Error while finding user', err);

        if (!user) return errorResponse(res, `Email not found`);

        const valid = await comparePassword(password, user.password);
        if (!valid) return errorResponse(res, 'Incorrect password');

        user.refresh_token = createRefreshToken(user._id);
        await user.save();

        // sets the refresh token to cookie. name: jid
        setRefreshTokenToCookie(res, user.refresh_token);

        successResponse(res, 'Logged in succesfully', {
          accessToken: createAccessToken(user._id),
          userData: user,
        });
      });
    } catch (err) {
      return errorResponse(res, 'Error while trying to find user', err);
    }
  },
  signUp: async (req, res) => {
    const { password, email } = req.body;
    try {
      await User.findOne({ email: email }, async (err, user) => {
        if (err) return errorResponse(res, 'Error while finding user', err);

        if (!user) {
          const hashedPassword = await hashPassword(password);
          req.body.password = hashedPassword;

          return UserController.create(req, res);
        }

        if (user) return errorResponse(res, 'User already exists');
      });
    } catch (err) {
      return errorResponse(res, 'Error while trying to find user', err);
    }
  },
  signOut: (_req, res) => {
    res.clearCookie('jid');
    return successResponse(res, 'Logged out');
  },
  genRefreshToken: async (req, res) => {
    const token = req.cookies.jid;

    if (!token) return errorResponse(res, 'No token', { accessToken: '' });

    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return errorResponse(res, 'Token not verified', { err: err, accessToken: '' });
    }

    const user = await User.findById(payload.userId);

    if (!user) return errorResponse(res, 'No user found', { accessToken: '' });

    if (user.refresh_token !== token) {
      return errorResponse(res, "Refresh tokens don't match", { accessToken: '' });
    }

    user.refresh_token = createRefreshToken(user._id);
    await user.save();

    // sets the refresh token to cookie. name: jid
    setRefreshTokenToCookie(res, user.refresh_token);

    successResponse(res, 'Successfully generated new token', {
      accessToken: createAccessToken(user._id),
    });
  },
};

module.exports = AuthController;
