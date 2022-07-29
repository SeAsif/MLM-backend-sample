const User = require('../models/users');
const Setting = require('../models/settings');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const { uploadToS3 } = require('../utils/s3');
const Request = require('../requests/user');

let FileUploadController = {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  create: async (req, res) => {
    const userId = req.user;
    const fileName = req.file;
    const fileType = req.headers['file_type'];
    try {
      switch (fileType) {
        case 'avatar':
          if (fileName) req.body.filename = await uploadToS3(req.file);
          const avatarResponse = await User.findByIdAndUpdate(
            { _id: userId },
            { avatar: req.body.filename },
            { new: true }
          );
          if (!avatarResponse) {
            errorResponse(res, null, 'Avatar not updated');
          }
          successResponse(res, 'Avatar updated', avatarResponse);
          break;

        case 'user_cover':
          if (fileName) req.body.filename = await uploadToS3(req.file);
          const coverResponse = await User.findByIdAndUpdate(
            { _id: userId },
            { user_cover: req.body.filename },
            { new: true }
          );
          if (!coverResponse) {
            errorResponse(res, null, 'Avatar not updated');
          }
          successResponse(res, 'Avatar updated', coverResponse);
          break;

        case 'site_logo':
          const site_logo = req.file;
          let settings, result;

          if (site_logo) req.body.filename = await uploadToS3(req.file);

          settings = await Setting.findOne({ key: 'site_logo' });

          if (!settings) {
            settings = new Setting({
              key: 'site_logo',
              value: req.body.filename,
              new: true,
            });
          } else {
            settings.value = req.body.filename;
          }

          result = await settings.save();
          if (!result) {
            errorResponse(res, null, 'Logo not Added');
          }
          successResponse(res, 'Logo Added', result);
          break;
        case 'image_slider':
          const image_slider = req.file;
          if (image_slider) req.body.filename = await uploadToS3(req.file);
          const imageSliders = new Setting({
            key: 'image_slider',
            value: req.body.filename,
            new: true,
          });
          const save_slider_image = await imageSliders.save();
          if (!save_slider_image) {
            errorResponse(res, null, 'Slider not Added');
          }
          successResponse(res, 'Slider Added', save_slider_image);
          break;
        default:
          errorResponse(res, null, 'No Key exits');
      }

      return;
    } catch (err) {
      errorResponse(res, null, err.message);
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  find: async (req, res) => {
    const query = req.query.key;
    try {
      const result = await Setting.find({ key: query });
      if (!result) {
        return errorResponse(res, 'File Not Found', 'Invalid Id');
      }
      successResponse(res, 'Files Retrieved Successfully', result);
    } catch (err) {
      return errorResponse(res, 'No file exit', err.message);
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  findAll: async (req, res) => {
    try {
      const files = await Setting.find({});
      successResponse(res, 'Files Retrieved Successfully', files);
    } catch (err) {
      return errorResponse(res, 'No file exit', err.message);
    }
  },
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  update: async (req, res) => {},
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  delete: async (req, res) => {
    const Id = req.query.id;
    try {
      const Request = req.body;
      const result = await Setting.findOneAndDelete({ _id: Id });
      if (!result) {
        return errorResponse(res, 'Cannot Delete this file', 'Invalid Id');
      }
      successResponse(res, 'File Deleted successfully', result);
    } catch (err) {
      return errorResponse(res, 'Cannot Delete this file', err);
    }
  },
};

module.exports = FileUploadController;
