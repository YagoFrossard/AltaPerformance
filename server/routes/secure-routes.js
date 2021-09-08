const express = require('express');
const passport = require("../passport/setup");
const router = express.Router();

router.get(
    '/profile',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            email: req.email,
            userType: req.user.userType,
            token: req.query.secret_token
        })
    }
);

module.exports = router;