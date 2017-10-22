const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


//countProductInCatalog validate
let countProductInCatalogCheck = (countProductInCatalog) => {
    if (!countProductInCatalog) {
        return false;
    } 
    else {
        if (countProductInCatalog <= 0) {
            return false;
        } 
        else {
            return true;
        }
    }
};
const countProductInCatalogValidator = [
    {
        validator: countProductInCatalogCheck,
        message: 'countProductInCatalog must be greater than zero'
    }
]


var CatalogSchema = new Schema({
    idBranch : { type: Schema.ObjectId, ref: 'Branch' },
    catalogName: { type: String, require: true, unique: true,lowercase: true },
    countProductInCatalog: {type:Number,require:true, validate: countProductInCatalogValidator,lowercase: true},
    products : [{ type: Schema.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Catalog', CatalogSchema);