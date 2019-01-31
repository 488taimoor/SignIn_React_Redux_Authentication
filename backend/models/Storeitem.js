const mongoose = require('mongoose');

var Storeitem = mongoose.model('Storeitem', {
    productname: { type: String },
    Company: { type: String },
    status: { type: Boolean },
    date: {type: Date}
    
});

module.exports = { Storeitem };