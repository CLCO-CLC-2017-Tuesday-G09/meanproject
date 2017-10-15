const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//countCatalogBranch validate
var countCatalogBranchCheck = (countCatalogBranch) => {
    if (!countCatalogBranch) {
        return false;
    } 
    else {
        if (countCatalogBranch <= 0) {
            return false;
        } 
        else {
            return true;
        }
    }
};
var countCatalogBranchValidator = [
    {
        validator: countCatalogBranchCheck,
        message: 'countCatalogBranch must be greater than zero'
    }
];
var BranchSchema = new Schema({
    branchName: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    countCatalogBranch: { type: Number, validate: countCatalogBranchValidator },
    idmenu:{ type: Schema.ObjectId, ref: 'Menu'},
    cataloges : [{ type: Schema.ObjectId, ref: 'Catalog' }]
});


module.exports = mongoose.model('Branch', BranchSchema);