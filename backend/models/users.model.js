const moongose = require('mongoose');

const userSchema = new moongose.Schema({
    username : { type : String , unique : true, required : true, dropDups: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    isActive : {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

const User = moongose.model('User', userSchema);

module.exports = User;