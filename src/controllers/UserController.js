const User = require('../models/users');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const { uploadToS3 } = require('../utils/s3');
const Request = require("../requests/user")

let UserController = {
  find: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.params.email }).populate(
        {
          path: "parent_id",
        });;

      if (!user) return errorResponse(res, 'User not found');

      successResponse(res, 'User found', user);
    } catch (err) {
      return errorResponse(res, 'Error trying to fetch user', err);
    }
  },
  all: async (_req, res) => {
    try {
      let allUsers = await User.find().populate(
        {
          path: "parent_id",
        });

      if (!allUsers) return errorResponse(res, 'Users not found');

      successResponse(res, 'Users found', allUsers);
    } catch (err) {
      return errorResponse(res, 'Error trying to fetch all users', err);
    }
  },
  create: async (req, res) => {
    var user = new User();

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.banned = 0;

    const savedUser = await user.save();

    const total = await User.find({});

    if (total.length === 1) {
      await User.updateOne({ _id: total._id }, { parent_id: null })
    } else {
      //Parent ID
      const parentId = req.body.parentId;

      if (parentId !== "") {
        await User.updateOne({ email: req.body.email }, { parent_id: parentId })
      } else {
        await User.updateOne({ email: req.body.email }, { parent_id: null })
      }

    }

    successResponse(res, 'User created successfully', savedUser);
  },
  updateSettings: async (req, res) => {
    const userId = req.user;
    try {
      const validate = await Request.update(req, res);
      if (validate.error) {
        errorResponse(res, "Validate error", validate.error.details)
        return
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
      );
      if (!updatedUser) {
        errorResponse(res, null, "User not updated")
        return
      }
      successResponse(res, 'User updated', updatedUser);
      return
    } catch (err) {
      errorResponse(res, null, err.message)
    }

  },
  updateAvatar: async (req, res) => {
    const userId = req.user;
    const avatar = req.file;
    try {
      if (avatar) req.body.avatar = await uploadToS3(req.file);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
      );
      if (!updatedUser) {
        errorResponse(res, null, "Avatar not updated")
        return
      }
      successResponse(res, 'Avatar updated', updatedUser);
      return
    } catch (err) {
      errorResponse(res, null, err.message)
    }

  },
  updatePassword: async (req, _res) => {
    const { new_password, email } = req.body;

    await User.findOneAndUpdate({ email: email }, { password: new_password });
  }
};

module.exports = UserController;
