const router = require('express').Router();
let Exercise = require('../models/execise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Erro: ${err}`));
});

router.route('/add').post((req, res) => {
    //Terminar o Schema dos exercícios antes de fazer isso

    const newExercise = new Exercise({});

    newExercise.save()
    .then(() => res.json('Usuário adicionado!'))
    .catch(err => res.status(400).json(`Erro: ${err}`));
});

module.exports = router;