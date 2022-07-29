const Products = require("../models/products");
const { successResponse } = require("../utils/responseUtils");

const HomepageController = {
    allSections: async (req, res) => {
        const recent_products = await Products.find().limit(10);

        const response = {
            recent_products
        }
        return successResponse(res, 'Homapage products', response)
    }
}

module.exports = HomepageController;
