const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


var MenuSchema = new Schema({
    menuname: { type: String },
    branches : [{ type: Schema.ObjectId, ref: 'Branch' }]
});

module.exports = mongoose.model('Menu', MenuSchema);