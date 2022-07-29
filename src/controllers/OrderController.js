const { errorResponse, successResponse } = require("../utils/responseUtils");
const Order = require('../models/orders');
const { PENDING, PROCESSING } = require("../utils/constants");
const Cart = require("../models/cart");

const OrderController =  {
    add: async (req, res) => {
        try {
            const hash = req.params.hash;
            const cart = await Cart.findOne({hash: hash});
            if (!cart) throw new Error ("Invalid request");

            const order = new Order();
            order.user_id = req.body.user_id || null;
            order.hash = hash;
            order.total_amount = cart.total_amount;
            order.shipping_full_name = cart.shipping_full_name,
            order.shipping_email = cart.shipping_email,
            order.shipping_phone_number = cart.shipping_phone_number,
            order.shipping_company = cart.shipping_company || null,
            order.shipping_zip_code = cart.shipping_zip_code,
            order.shipping_country = cart.shipping_country,
            order.shipping_address_1 = cart.shipping_address_1,
            order.shipping_address_2 = cart.shipping_address_2 || null,
            order.billing_full_name = cart.billing_full_name,
            order.billing_email = cart.billing_email,
            order.billing_phone_number = cart.billing_phone_number,
            order.billing_company = cart.billing_company,
            order.billing_zip_code = cart.billing_zip_code,
            order.billing_country = cart.billing_country,
            order.billing_address_1 = cart.billing_address_1,
            order.billing_address_2 = cart.billing_address_2,
            order.is_same_shipping = cart.is_same_shipping;
            order.products = cart.products;
            order.order_status = req.body.payment_method == 'code' ? PENDING : PROCESSING;
            order.payment_method = req.body.payment_method;
            order.order_date = new Date();

            await order.save();

            await cart.delete();

            successResponse(res, "Order placed successfully", order);
        } catch (e) {
            errorResponse(res, "Something went wrong " + e)
        }
    },
    myOrders: async (req, res) => {
        const orders = await Order.find({hash: req.params.hash});
        successResponse(res, "My Orders", orders);
    },
    single: async (req, res) => {
        const order = await Order.findOne({_id: req.params.id});
        if (!order) errorResponse(res, "No order found");
        successResponse(res, "My Order", order);
    }
}

module.exports = OrderController;