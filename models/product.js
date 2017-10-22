const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var ProductSchema = new Schema({
    nameproduct: { type: String,lowercase: true },
    description:{type:String,lowercase: true},
    size: { type: String},
    color: { type: String},
    price:{type:String},
    image: {type: String },
    count_user_buy:{type:Number},
    count_user_search:{type:Number},
    amountproduct:{type:Number},
    checksale:{type:Number},
    checknew:{type:Number},
    promotion:{type:Number},
    idcatalog:{ type: Schema.ObjectId, ref: 'Catalog'},
});

module.exports = mongoose.model('Product', ProductSchema);