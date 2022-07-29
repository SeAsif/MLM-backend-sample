const Page = require('../models/pages');
const { errorResponse, successResponse } = require('../utils/responseUtils');
const { uploadToS3 } = require('../utils/s3');
const { genSlug } = require('../utils/utils');

let PagesController = {
  create: async (req, res) => {
    try {
      const { title, description } = req.body;
      const valid = await Page.findOne({ title: title });
      if (valid) return errorResponse(res, `A page with title: ${title} already exists`);

      const newPage = new Page();
      newPage.title = title;
      newPage.description = description;
      newPage.slug = genSlug(title);
      newPage.meta_title = req.body.meta_title;
      newPage.meta_keywords = req.body.meta_keywords;
      newPage.meta_descriptions = req.body.meta_descriptions;

      const featured_image = req.files.featured_image;
      if (!featured_image) return errorResponse(res, 'Featured image not uploaded');
      newPage.featured_image = await uploadToS3(featured_image[0]);

      const images = req.files.images;
      if (images) {
        for (const image of images) {
          newPage.images.push(await uploadToS3(image));
        }
      }

      await newPage.save();

      successResponse(res, 'Created page successfully', newPage);
    } catch (err) {
      return errorResponse(res, 'Error catched', err.message);
    }
  },
  find: async (req, res) => {
    try {
      const page = await Page.findOne({ slug: req.params.slug });

      if (!page) return errorResponse(res, `No page found`);
      successResponse(res, 'Page found', page);
    } catch (err) {
      return errorResponse(res, 'Error catched', err);
    }
  },
  update: async (req, res) => {
    try {
      const { slug, new_title } = req.body;

      if (new_title) {
        req.body.title = new_title;
        req.body.slug = genSlug(new_title);
      }

      const updatedPage = await Page.findOneAndUpdate(
        { slug: slug },
        { ...req.body },
        { new: true }
      );
      if (!updatedPage) return errorResponse(res, "Couldn't update page");
      successResponse(res, 'Page updated', updatedPage);
    } catch (err) {
      return errorResponse(res, 'Error catched', err);
    }
  },
  delete: async (req, res) => {
    try {
      const { slug } = req.body;

      const deletedPage = await Page.findOneAndDelete({ slug: slug });

      if (!deletedPage) return errorResponse(res, 'No page to delete');

      successResponse(res, 'Page deleted', deletedPage);
    } catch (err) {
      return errorResponse(res, 'Error catched', err);
    }
  },
};

module.exports = PagesController;
