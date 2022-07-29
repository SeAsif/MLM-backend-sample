const { Joi } = require("express-validation");

module.exports = {
    addToCart: {
        body: Joi.object({
            hash: Joi.string().required(), 
            product_id: Joi.string().required(),
            quantity: Joi.number().integer().required()
        })    
    },
    updateShipping: {
        body: Joi.object().keys({
            shipping_full_name: Joi.string().required(),
            shipping_email: Joi.string().email().required(),
            shipping_phone_number: Joi.string().required(),
            shipping_country: Joi.object().required(),
            shipping_zip_code: Joi.number().required(),
            shipping_address_1: Joi.string().required(),
            shipping_address_2: Joi.string().empty(''),
            shipping_company: Joi.string().empty(''),
            is_same_shipping: Joi.boolean().default(true),
            billing_full_name: Joi.string().empty(''),
            billing_email: Joi.string().email().empty(''),
            billing_phone_number: Joi.string().empty(''),
            billing_country: Joi.object().empty(''),
            billing_zip_code: Joi.number().empty(''),
            billing_address_1: Joi.string().empty(''),
            billing_address_2: Joi.string().empty(''),
            billing_company: Joi.string().empty(''),
        })
    }
}

