const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Gerando um Schema para salvar os dados do administrador
const administratorSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlenght: 4
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 10
    }
},{
    timestamps: true
});

const Administrator = mongoose.model('Administrator',administratorSchema);

module.export = Administrator;