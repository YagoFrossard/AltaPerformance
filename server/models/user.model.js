const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Gerando um Schema para salvar os dados dos usuários
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 10
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 0
    },
    telephone_number: {
        type: String,
        required: true,
        trim: true,
        minlength: 11
    },
    user_type: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionkey: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;