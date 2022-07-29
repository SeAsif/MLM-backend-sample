const Category = require('../models/categories');
const { errorResponse, successResponse } = require('../utils/responseUtils');
const { uploadToS3 } = require('../utils/s3');
const { genSlug } = require('../utils/utils');

let CategoryController = {
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      console.log('name', name)
      if (!name || !description) return errorResponse(res, 'name and description are required');

      const valid = await Category.findOne({ name: name });
      if (valid) return errorResponse(res, `A category with name ${name} already exists`);

      const newCategory = new Category();
      newCategory.name = name;
      newCategory.description = description;
      newCategory.slug = genSlug(name);
      newCategory.creation_date = new Date();
      newCategory.updation_date = new Date();
      newCategory.status = req.body.status;
      newCategory.order = req.body.order;
      newCategory.nav_status = req.body.nav_status;
      newCategory.featured = req.body.featured;
      newCategory.special = req.body.special;

      if (req.file) {
        newCategory.image = await uploadToS3(req.file);
      }

      await newCategory.save();

      successResponse(res, 'Create category successfully', newCategory);
    } catch (err) {
      return errorResponse(res, 'Error catched at CategoryController create', err.message);
    }
  },
  find: async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });

      if (!category) return errorResponse(res, 'No category found');
      successResponse(res, 'Category found', category);
    } catch (err) {
      return errorResponse(res, 'Error catched at CategoryController find', err);
    }
  },
  findAll: async (req, res) => {
    try {
      const categories = await Category.find();
      if (!categories.length) return errorResponse(res, 'No categories');
      successResponse(res, 'Found all categories', categories);
    } catch (err) {
      return errorResponse(res, 'Error catched at CategoryController finAll', err);
    }
  },
  update: async (req, res) => {
    try {
      // Extract new_name because a new slug has to be created if that value exists.
      const { slug, new_name } = req.body;

      if (new_name) {
        req.body.name = new_name;
        req.body.slug = genSlug(new_name);
      }

      const updatedCat = await Category.findOneAndUpdate(
        { slug: slug },
        { ...req.body },
        { new: true }
      );

      if (!updatedCat) return errorResponse(res, "Couldn't update category");
      successResponse(res, 'Category update', updatedCat);
    } catch (err) {
      return errorResponse(res, 'Error catched at CategoryController update', err);
    }
  },
  delete: async (req, res) => {
    try {
      const { slug } = req.body;

      const deletedPage = await Category.findOneAndDelete({ slug: slug });

      if (!deletedPage) return errorResponse(res, "Couldn't delete category", deletedPage);

      successResponse(res, 'Category deleted');
    } catch (err) {
      return errorResponse(res, 'Error catched at CategoryController delete', err);
    }
  },
};

module.exports = CategoryController;
