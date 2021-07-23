//Usar qualquer software de get e post para testar o banco de dados

const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 3;
let User = require('../models/user.model');
const salt = bcrypt.genSaltSync(saltRounds);

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Erro: ${err}`));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    //Gerando senha com hash
    const password = bcrypt.hashSync(req.body.telephone_number, salt);
    const name = req.body.name;
    const telephone_number = req.body.telephone_number;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const user_type = req.body.user_type;

    const newUser = new User({
        username,
        password,
        name,
        telephone_number,
        cpf,
        email,
        user_type
    });

    newUser.save()
    .then(() => res.json('Usuário adicionado!'))
    .catch(err => res.status(400).json(`Erro: ${err}`));
});

module.exports = router;