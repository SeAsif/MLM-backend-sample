const Package = require('../models/packages');
const { errorResponse, successResponse } = require('../utils/responseUtils');
const { uploadToS3 } = require('../utils/s3');
const { genSlug } = require('../utils/utils');
const PackageCollection =require('../collections/packages.collection')
let PackageController = {
    create: async (req, res) => {
        try {

            //
            const Request = req.body;
            //
            const Data = new Package();
            Data.title = Request.title;
            Data.slug = Request.title;
            Data.description = Request.description;
            Data.price = Request.price;
            Data.fields = Request.fields;
            Data.status = Request.status;
            //
            //Save Package
            await Data.save()
            //
            //Return collection
            const response = PackageCollection.created(Data)
            //
            successResponse(res, 'Create Package successfully', response);
            
        }
        catch (err) {
            return errorResponse(res, 'Error trying to create package', err.message);
        }

    },
    //
    find: async (req, res) => {
        try {
            //
            const Data = await Package.findOne({ _id: req.body.id });
            //
            if (!Data) return errorResponse(res, 'No Package found');
            //Return collection
            const response = PackageCollection.one(Data)
            //
            successResponse(res, 'Package retrieved successfully', response);
        } catch (err) {
            return errorResponse(res, 'Error at Package find', err.message);
        }
    },
    //
    findAll: async (req, res) => {
        try {
            const Data = await Package.find().sort({ "createdAt": -1 });
            //Return collection
            const response = PackageCollection.all(Data)
            //
            successResponse(res, 'Package retrieved successfully', response);
        } catch (err) {
            return errorResponse(res, 'Error at Package find', err.message);
        }
    },
    //
    update: async (req, res) => {
        try {
            //
            const Request = req.body;
            //
            const Data = {
                title :Request.title,
                slug :Request.title,
                description : Request.description,
                price : Request.price,
                fields :Request.fields,
                status: Request.status,
                updatedAt:new Date()
            }

        //Update Package
        let result = await Package.findOneAndUpdate({ _id: Request.id }, Data)
            if (!result) return errorResponse(res, "Couldn't update Updated");
        //
        //Return collection
        const response = PackageCollection.updated(result)
        //
        successResponse(res, 'Updated Package successfully', response);
        }
        catch (err) {
            return errorResponse(res, 'Error trying to update package', err.message);
        }
    },
    //
    delete: async (req, res) => {
        try {
            //
            const Request = req.body;
            //Delete Package
            const result = await Package.findOneAndDelete({ _id: Request.id });
            //Return collection
            const response = PackageCollection.one(result)
        //
            successResponse(res, 'Deleted Package successfully', response);
        }
        catch (err) {
            return errorResponse(res, 'Error trying to update package', err);
        }
    }
    

}
module.exports = PackageController;