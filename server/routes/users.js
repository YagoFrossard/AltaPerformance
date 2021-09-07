//Usar qualquer software de get e post para testar o banco de dados

const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');
const passport = require("../passport/setup");
const salt = 3;

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Erro: ${err}`));
});

router.route('/add').post((req, res) => {
    //Gerando senha com hash
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, salt)
    const name = req.body.name;
    const telephone_number = req.body.telephone_number;
    const user_type = req.body.user_type;

    const newUser = new User({
        email,
        password,
        name,
        telephone_number,
        user_type
    });

    newUser.save()
        .then(() => res.json('Usuário adicionado!'))
        .catch(err => res.status(400).json(`Erro: ${err}`));
});

router.route('/signup').post(async (req, res, next) => {
    passport.authenticate('signup', { session: false });
    res.json({
        message: 'Usuário cadastrado com sucesso',
        user: req.user
    });
});

// router.post(
//     '/signup',
//     passport.authenticate('signup', { session: false }),
//     async (req, res, next) => {
//         res.json({
//             message: 'Signup successful',
//             user: req.user
//         });
//     }
// );

module.exports = router;