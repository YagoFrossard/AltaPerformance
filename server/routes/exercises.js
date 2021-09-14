const router = require('express').Router();
let Exercise = require('../models/execise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Erro: ${err}`));
});

router.route('/add').post((req, res) => {
    //Terminar o Schema dos exercícios antes de fazer isso

    const name = req.body.name;
    const video_link = req.body.video_link;
    const name_translated = req.body.name_translated;
    const difficulty = req.body.difficulty;
    const category = req.body.category;
    const stage = req.body.stage;
    const type = req.body.type;

    const newExercise = new Exercise({
        name,
        video_link,
        name_translated,
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