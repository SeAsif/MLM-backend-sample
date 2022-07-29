const { count } = require("../models/cart");
const Cart = require("../models/cart");
const Products = require("../models/products");
const { errorResponse, successResponse } = require("../utils/responseUtils")

const CartController = {
    add: async (req, res) => {
        try {
            let cartModel = await Cart.findOne({hash: req.body.hash});

            const product_id = req.body.product_id;
            const quantity = req.body.quantity;
            let totalAmount = 0;
            const product = await Products.findOne({_id: product_id}).select('_id name slug images amount quantity status');
            if (!product) throw new Error ("Product not found");
            if (product.quantity == 0) throw new Error ("Quantity exceeded");

            let products = [];
            if (!cartModel) {
                cartModel = new Cart();
                cartModel.hash = req.body.hash;
                cartModel.created_at = new Date();
                cartModel.user_id = req.body.user_id || null;
                products = [{
                    quantity: quantity,
                    amount: product.amount,
                    product: product
                }]
            } else {
                const productIndex = cartModel.products.findIndex(x => x.product._id == product_id);
                if (productIndex != -1) {
                    cartModel.products[productIndex].quantity = quantity;
                    cartModel.products[productIndex].amount = product.amount;

                } else {
                    cartModel.products.push({
                        quantity: quantity,
                        amount: product.amount,
                        product
                    })
                }
                products = cartModel.products;
            }
            
            cartModel.products = products;
            totalAmount = products.reduce((a, b) => {
                return a + (Number(b.amount) * b.quantity);
            }, 0);
            cartModel.updated_at = new Date();
            cartModel.total_amount = totalAmount;
            await cartModel.save();
            
            successResponse(res, 'Product added to cart successfully', cartModel);

        } catch (e) {
            errorResponse(res, 'Something went wrong ' + e)
        }
    },
    find: async(req, res) => {
        try {
            const cart = await Cart.findOne({hash: req.params.hash});

            successResponse(res, "Cart found", cart);
        } catch(e) {
            errorResponse(res, "Something went wrong ", e)
        }
    },
    clear: async (req, res) => {
        try {
            let cart = await Cart.findOne({hash: req.params.hash});
            if (!cart) throw new Error("Failed to find cart");
            await cart.delete();
            cart = null;
            successResponse(res, "Cart cleared successfully", cart);

        } catch (e) {
            errorResponse(res, "Something went wrong " + e)
        }
    },
    removeItem: async (req, res) => {
        try {
            let cart = await Cart.findOne({hash: req.params.hash});
            if (!cart) throw new Error ("Failed to find the cart");
            const productIndex = cart.products.findIndex(x => x.product._id == req.params.productId);
            if (productIndex != -1) {
                cart.products.splice(productIndex, 1);
            } else {
                throw new Error ("Failed to find the product");
            }
            cart.total_amount = cart.products.reduce((a, b) => {
                return a + (Number(b.amount) * b.quantity);
            }, 0);
            await cart.save();
            if (!cart.products.length) {
                await cart.delete();
                cart = null;
            }
            // console.log('cart', cart)

            successResponse(res, "Cart cleared successfully", cart);

        } catch (e) {
            errorResponse(res, "Something went wrong " + e)
        }
    },
    update: async (req, res) => {
        try {
            let cart = await Cart.findOne({hash: req.params.hash});
            if (!cart) throw new Error ("Failed to find the cart");

            cart.shipping_full_name = req.body.shipping_full_name,
            cart.shipping_email = req.body.shipping_email,
            cart.shipping_phone_number = req.body.shipping_phone_number,
            cart.shipping_company = req.body.shipping_company || null,
            cart.shipping_zip_code = req.body.shipping_zip_code,
            cart.shipping_country = req.body.shipping_country,
            cart.shipping_address_1 = req.body.shipping_address_1,
            cart.shipping_address_2 = req.body.shipping_address_2 || null,
            cart.billing_full_name = req.body.is_same_shipping ? req.body.shipping_full_name : req.body.billing_full_name,
            cart.billing_email = req.body.is_same_shipping ? req.body.shipping_email : req.body.billing_email,
            cart.billing_phone_number = req.body.is_same_shipping ? req.body.shipping_phone_number : req.body.billing_phone_number,
            cart.billing_company = req.body.is_same_shipping ? req.body.shipping_company : req.body.billing_company,
            cart.billing_zip_code = req.body.is_same_shipping ? req.body.shipping_zip_code : req.body.billing_zip_code,
            cart.billing_country = req.body.is_same_shipping ? req.body.shipping_country : req.body.billing_country,
            cart.billing_address_1 = req.body.is_same_shipping ? req.body.shipping_address_1 : req.body.billing_address_1,
            cart.billing_address_2 = req.body.is_same_shipping ? req.body.shipping_address_2 : req.body.billing_address_2,
            cart.is_same_shipping = req.body.is_same_shipping;

            await cart.save();

            successResponse(res, "Shipping and billing saved successfully", cart);

        } catch(e) {
            errorResponse(res, "Something went wrong " + e)
        }
    }
}

module.exports = CartController