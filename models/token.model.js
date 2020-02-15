const mongoose = require ('mongoose');
const{ObjectId} = mongoose.Schema.Types;
let tokenSchema = new mongoose.Schema({
    userID: {type:ObjectId,ref:"User"},
})

module.exports = mongoose.model("Token",tokenSchema);