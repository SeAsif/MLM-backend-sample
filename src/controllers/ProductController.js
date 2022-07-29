const Product = require('../models/products');
const { errorResponse, successResponse } = require('../utils/responseUtils');
const { uploadFile, uploadToS3 } = require('../utils/s3');
const Category = require('../models/categories');
const { genSlug } = require('../utils/utils');
const { calculateComission } = require('../utils/commonHelper');

let ProductController = {
  add: async (req, res) => {
    // console.log(req.files.images);
    // return;
    try {
      const product = new Product();
      product.name = req.body.name;
      product.slug = genSlug(req.body.name);
      product.description = req.body.description;
      product.category = req.body.category;
      product.amount = req.body.amount;
      product.code = req.body.code;
      product.investment_amount = req.body.investment_amount;
      product.expiry_date = req.body.expiry_date;

      const images = req.files.images;
      // console.log('images', images);
      if (images) {
        for (const image of images) {
          console.log('image', image)
          product.images.push(await uploadToS3(image));
        }
      }
      product.quantity = req.body.quantity;
      product.sales_quantity = req.body.sales_quantity;
      product.status = req.body.status;
      product.date = req.body.date;
      await product.save();

      successResponse(res, 'Product added successfully', product);
    } catch (err) {
      return errorResponse(res, 'Product adding went wrong' + err);
    }

  },
  getProductsByCategory: async (req, res) => {
    try {
      const category = await Category.findOne({ slug: req.params.slug });
      if (!category) return errorResponse(res, 'Invalid url');

      const { page = 1, limit = 10 } = req.query;

      const products = await Product.find({ category: category.id })
        .populate('category', 'name slug')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Product.find({ category: category.id }).countDocuments();


      const productsArray = [];
      products.map((i) => {
        productsArray.push({
          commision_percentage: calculateComission(i.amount),
          images: i.images,
          _id: i._id,
          name: i.name,
          slug: i.slug,
          description: i.description,
          category: i.category,
          amount: i.amount,
          quantity: i.quantity,
          status: i.status,
          __v: i._v
        })
      })


      const response = {
        products: productsArray,
        totalPages: Math.ceil(count / limit),
        totalProducts: count,
        currentPage: page
      }

      successResponse(res, 'Products found', response)

    } catch (err) {
      return errorResponse(res, 'Unable to get products ' + err)
    }
  },
  update: async (req, res) => {

    try {
      const { name } = req.body;
      req.body.slug = genSlug(name);

      const updateProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );

      if (!updateProduct) return errorResponse(res, 'Could not update product');

      successResponse(res, 'Product updated successfully', updateProduct)

    } catch (err) {
      return errorResponse(res, 'Unable to get products ' + err)
    }

  },
  single: async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug });

      if (!product) return errorResponse(res, 'No product found');

      product.category = await Category.findOne({ _id: product.category })

      successResponse(res, 'Product found', product);
    } catch (err) {
      return errorResponse(res, 'Something went wrong ' + err);
    }
  },
  delete: async (req, res) => {
    console.log('slug', req.params)
    const deletedPage = await Product.findOneAndDelete({ slug: req.params.slug });
    if (!deletedPage) return errorResponse(res, "Couldn't delete product", deletedPage);

    return successResponse(res, "Product Deleted successfully");
  },

};

module.exports = ProductController;
