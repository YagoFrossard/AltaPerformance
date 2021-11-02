const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Erro: ${err}`));
});

router.route('/add').post((req, res) => {

    const name = req.body.name;
    const name_translated = req.body.name_translated;
    const link = req.body.link;
    const difficulty = req.body.difficulty;
    const category = req.body.category;
    const stage = req.body.stage;
    const type = req.body.type;

    const newExercise = new Exercise({
        name,
        name_translated,
        link,
        difficulty,
        category,
        stage,
        type
    });

    newExercise.save()
        .then(() => res.json('Exercício adicionado!'))
        .catch(err => res.status(400).json(`Erro: ${err}`));
});

module.exports = router;