const { errorResponse, successResponse } = require('../utils/responseUtils');
const SiteSettings = require('../models/site_settings');
const { uploadToS3 } = require('../utils/s3');

let SiteSettingsController = {
  create: async (req, res) => {
    try {
      const newSiteSettings = await SiteSettings.create({ ...req.body });

      if (!newSiteSettings) return errorResponse(res, "Couldn't delete site settings");

      successResponse(res, 'site settings created successfully', newSiteSettings);
    } catch (err) {
      return errorResponse(res, 'Error while creating site settings', err.message);
    }
  },
  find: async (req, res) => {
    try {
      const id = req.query.id;
      const identifier = req.params.key;

      const settings = await SiteSettings.findById(id);

      if (!settings) return errorResponse(res, 'No site settings found');

      if (!identifier) return successResponse(res, 'found site settings', settings);

      return successResponse(
        res,
        `found ${identifier} settings`,
        settings[`${identifier}_settings`]
      );
    } catch (err) {
      return errorResponse(res, 'Error while fetching site settings', err.message);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.query.id;
      const identifier = req.params.key;
      const logo = req.file;

      if (logo) req.body.site_logo = await uploadToS3(logo);

      const siteSettings = await SiteSettings.findById(id);

      if (!siteSettings) return errorResponse(res, `Settings not found`);

      let settingsToUpdate = siteSettings[`${identifier}_settings`];

      if (identifier) {
        Object.assign(settingsToUpdate, req.body);
      }

      await siteSettings.save();

      successResponse(res, `${identifier} settings updated`, settingsToUpdate);
    } catch (err) {
      return errorResponse(res, `Error while updating ${identifier} settings`, err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const deletedSettings = await SiteSettings.findOneAndDelete({ _id: req.params.key });
      if (!deletedSettings) return errorResponse(res, "Couldn't delete site settings");

      successResponse(res, 'site settings deleted successfully', deletedSettings);
    } catch (err) {
      return errorResponse(res, 'Error while deleting site settings', err.message);
    }
  },
};

module.exports = SiteSettingsController;
