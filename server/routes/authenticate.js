const router = require('express').Router();
const passport = require('passport');

router.route('/login').post((req, res, next) => {
    passport.authenticate('local', function(err, user, info)  {
        if(err){
            return res.status(400).json({errors: "Erro"});
        }
        if(!user){
            return res.status(400).json({errors: "Usuário não validado"});
        }
        req.logIn(user, function(err) {
            if(err){
                return res.status(400).json({errors: err});
            }
            return res.status(200).json({success: `Logado como ${user.id}`});
        });
    })(req, res, next);
});

module.exports = router;