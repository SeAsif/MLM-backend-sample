const Country = require('../models/countries');
const { errorResponse, successResponse } = require('../utils/responseUtils');

let CountriesController = {
  create: async (req, res) => {
    try {
      let country = new Country();
      country.country_name = req.body.country_name;
      country.country_code = req.body.country_code;
      country.states = req.body.states;

      await country.save();

      successResponse(res, 'Country created successfully', country);
    } catch (err) {
      return errorResponse(res, 'Error trying to create country', err);
    }
  },
  findAll: async (req, res) => {
    try {
      const allCountries = await Country.find();

      if (!allCountries) return errorResponse(res, 'No countries found');

      successResponse(res, 'Countries found', allCountries);
    } catch (err) {
      return errorResponse(res, 'Error trying to fetch all countries', err);
    }
  },
  findOne: async (req, res) => {
    try {
      await Country.findOne({ country_code: req.params.country_code }, (err, doc) => {
        if (err) return errorResponse(res, 'Error while finding country', err);

        if (!doc) return errorResponse(res, 'Country does not exist');

        successResponse(res, 'country found', doc);
      });
    } catch (err) {
      return errorResponse(res, 'Error trying to fetch one country', err);
    }
  },
  update: async (req, res) => {
    try {
      const updatedCountry = await Country.findOneAndUpdate(
        { _id: req.body._id },
        { ...req.body },
        { new: true }
      );

      if (!updatedCountry) return errorResponse(res, 'No country updated');

      successResponse(res, 'Country updated', updatedCountry);
    } catch (err) {
      return errorResponse(res, 'Error trying to update a country', err);
    }
  },
  delete: async (req, res) => {
    try {
      const deletedCountry = await Country.findOneAndDelete({
        country_code: req.body.country_code,
      });

      successResponse(res, 'Country deleted', deletedCountry);
    } catch (err) {
      return errorResponse(res, 'Error trying to delete a country', err);
    }
  },
};

module.exports = CountriesController;
