const ForgotPassword = require('../models/forgotPassword');
const User = require('../models/users');
const { sendMail } = require('../utils/mailer');
const { errorResponse, successResponse } = require('../utils/responseUtils');
const { genForgotPasswordToken, hashPassword } = require('../utils/utils');
const UserController = require('./UserController');

let UtilsController = {
  resetPasswordAPI: async (req, res) => {
    const { token, email, new_password } = req.body;

    const user = await ForgotPassword.findOne({ token: token, email: email }, (err, doc) => {
      if (err) return errorResponse(res, 'Error while finding user', err);
      if (!doc) return errorResponse(res, 'Not found on list');
      if (token !== doc.token) return errorResponse(res, "Token doesn't match");
      if (email !== doc.email) return errorResponse(res, "Email doesn't match");

      return doc;
    });

    // save new token to list
    user.token = genForgotPasswordToken();
    await user.save();

    // hash pass
    req.body.new_password = await hashPassword(new_password);

    // update on User
    UserController.updatePassword(req);

    successResponse(res, 'password successfully changed', { token: user.token, email });
  },
  addUserToForgotPasswordList: async (req, res) => {
    try {
      const email = req.params.email;

      const user = await User.findOne({ email: email });
      if (!user) return errorResponse(res, 'Email not found.');

      const userToAdd = new ForgotPassword();
      userToAdd.email = email;
      userToAdd.token = genForgotPasswordToken();

      await userToAdd.save();
      await UtilsController.passwordRecoveryEmailAPI(userToAdd.email);

      successResponse(
        res,
        'An email is sent to you, please check your email to reset your password',
        userToAdd
      );
    } catch (err) {
      return errorResponse(res, 'Error catched: ', err);
    }
  },
  passwordRecoveryEmailAPI: async email => {
    await ForgotPassword.findOne({ email: email }, async (err, doc) => {
      if (doc) {
        const result = await sendMail({
          from: '305 Global Marketing <support@305gm.com>',
          to: doc.email,
          subject: 'Reset Password',
          text: 'Click the link below to reset your password',
          html: `<p>Click the link below to reset your password</p>
          <a href='${process.env.WEB_URL}/reset-password?email=${doc.email}&token=${doc.token}'>Reset Password</a> `,
        });

        return true;
      }
    });
  },
};

module.exports = UtilsController;
