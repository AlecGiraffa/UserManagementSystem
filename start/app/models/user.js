/**
 * Created by AlecNing on 2/4/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "id" : Number,
    "Name" : {
        "fName" : String,
        "lName" : String
    },
    "Title" : String,
    "Sex" : String,
    "Start Date" : {
        "Month" : String,
        "Day" : String,
        "year" : String
    },
    "Office Phone" : {
        "areaCode" : String,
        "subCode1" : String,
        "subCode2" : String
    },
    "SMS" : {
        "areaCode" : String,
        "subCode1" : String,
        "subCode2" : String
    },
    "Email" : String,
    "Manager" : Number,
    "LastID" : Number,
    "NumReport" : Number
},{
    collection : 'users'
});

module.exports = mongoose.model('users', UserSchema);