const Joi = require('joi');

const updateUser = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  address_1: Joi.string().required(),
  address_2: Joi.string().allow(''),
  city: Joi.string().required(),
  zip_code: Joi.string().required(),
  state_id: Joi.string().required(),
  country_id: Joi.string().required(),
  date_of_birth: Joi.date().required(),
  gender: Joi.valid('male', 'female').required(),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  facebook: Joi.string().allow(''),
  twitter: Joi.string().allow(''),
  instagram: Joi.string().allow(''),
  linkedIn: Joi.string().allow(''),
  youtube: Joi.string().allow(''),
});

module.exports = {
  updateUser,
};
