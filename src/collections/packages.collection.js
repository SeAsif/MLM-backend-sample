
const Commonhelper = require("../utils/commonHelper");


let PackageCollection = {

    /**
     * @returns JSON
     */
    created:(data) => {
        const collection = {
            title: data.title,
            slug: data.slug,
            description: data.description,
            price:  data.price,
            fields: data.fields,
            status: data.status == 1 ? 'enabled' : 'disabled',
            createdAt: Commonhelper.formatDateTime(data.createdAt)
        }
        //
        return collection;
    },

    /**
     * @returns JSON
     */
    updated: (data) => {
        const collection = {
            title: data.title,
            slug: data.slug,
            description: data.description,
            price:  data.price,
            fields: data.fields,
            status: data.status == 1 ? 'enabled' : 'disabled',
            createdAt: Commonhelper.formatDateTime(data.createdAt),
            updatedAt: Commonhelper.formatDateTime(data.updatedAt)
        }
        //
        return collection;
    },

    /**
     * @returns JSON
     */
    one: (data) => {
        const collection = {
            title: data.title,
            slug: data.slug,
            description: data.description,
            price:  data.price,
            fields: data.fields,
            status: data.status == 1 ? 'enabled' : 'disabled',
            createdAt: Commonhelper.formatDateTime(data.createdAt),
            updatedAt: Commonhelper.formatDateTime(data.updatedAt)
        }
        //
        return collection;
    },
    /**
     * @returns JSON
     */
    all: (data) => {
        const collection = [];
        
        data.map(i => {
            collection.push({
            id: i._id,
            title: i.title,
            slug: i.slug,
            description: i.description,
            price: '$' + i.price,
            fields: i.fields,
            status: i.status == 1 ? 'enabled' : 'disabled',
            createdAt: Commonhelper.formatDateTime(i.createdAt),
            updatedAt: Commonhelper.formatDateTime(i.updatedAt)
            })})
        //
        return collection;
    }
    
}



module.exports = PackageCollection;


