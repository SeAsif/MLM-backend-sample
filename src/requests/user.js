const Validation = require('../validations/validateUser');

class User{

    constructor() { }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async update(req, res){
        const request = req.body;
        return Validation.updateUser.validate(request, { abortEarly: false })
    }
}


module.exports = new User();