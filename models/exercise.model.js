const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Gerando um Schema para salvar os dados dos exercícios
const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    name_translated: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    link: {
        type: String,
        required: true,
        trim: true,
        minlength: 0
    },
    difficulty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionkey: false
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;