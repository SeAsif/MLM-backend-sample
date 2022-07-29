const User = require('../models/users');
const Setting = require('../models/settings');
const { successResponse, errorResponse } = require('../utils/responseUtils');
const { uploadToS3 } = require('../utils/s3');
const Request = require('../requests/user');

let Commonhelper = {

    /**
     * @param String
     * @returns Date
     * @format  Y-m-d
    */
    formatDate: (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },

    /** 
     * @param String 
     * @returns datetime
     * @format  Y-m-d h:m:s
    */
    formatDateTime: (data) => {
        const t = new Date(data);
        const date = ('0' + t.getDate()).slice(-2);
        const month = ('0' + (t.getMonth() + 1)).slice(-2);
        const year = t.getFullYear();
        const hours = ('0' + t.getHours()).slice(-2);
        const minutes = ('0' + t.getMinutes()).slice(-2);
        const seconds = ('0' + t.getSeconds()).slice(-2);
        const datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

        return datetime;
    },

    /**
     *
     * @param {*} salePrice
     * @returns
     */
    calculateComission: async (salePrice) => {
        //Todo
        //Need to set Constant Value for commission_percentage in case when not set in database
        const commission_percentage = 0;
        try {
            const data = await Setting.findOne({ key: 'commission_percentage' });
            if (data !== null) {
                commission_percentage = parseInt(data.commission_percentage);
            }
            return parseInt(salePrice) * commission_percentage / 100;

        } catch (err) {
            return parseInt(salePrice) * commission_percentage / 100;
        }
    }

}


module.exports = Commonhelper;