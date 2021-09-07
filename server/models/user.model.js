const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

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

//Antes de salvar no banco de dados, a seguinte função é chamada devido ao uso do '.pre()'
userSchema.pre(
    'save',
    async function(next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 3);

        this.password = hash;
        next();
    }
);

//Função para verificar se a senha usada é igual a senha armazenada no banco de dados
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const User = mongoose.model('User', userSchema);

module.exports = User;