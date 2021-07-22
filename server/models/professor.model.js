const mongoose = require('mongoose');

const Schema = mongoose.Schema();

//Gerando um Schema para salvar os dados dos professores
const professorSchema = new Schema({
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
        unique: true,
        trim: true,
        minlength: 11
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    }
},{
    timestamps: true
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;