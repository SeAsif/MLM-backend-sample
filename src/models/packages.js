const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true  },
    description: { type: String, required: true },
    price: {
        type: Number,
        trim: true,
        default: 0
    },
    fields: String,
    status: Boolean, // (0=disabled, 1=enabled)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },

    
});

module.exports = mongoose.model('Package', PackageSchema);
