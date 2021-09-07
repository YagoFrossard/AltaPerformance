const router = require('express').Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");

require('dotenv').config();

router.route('/login').post((req, res, next) => {
    passport.authenticate('local',function(err, user, info)  {
        if(err){
            return res.status(400).json({errors: "Erro"});
        }
        if(!user){
            return res.status(400).json({errors: "Usuário não validado"});
        }
        req.logIn(user, { session: false}, function(err) {
            if(err){
                return res.status(400).json({errors: err});
            }

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

            return res.json({ token });

            // return res.status(200).json({success: `Logado como ${user.id}`});
        });
    })(req, res, next);
});

// router.post(
//     '/login',
//     async (req, res, next) => {
//         passport.authenticate(
//             'login',
//             async (err, user, info) => {
//                 try {
//                     if (err || !user) {
//                         const error = new Error('An error occurred.');
//
//                         return next(error);
//                     }
//
//                     req.login(
//                         user,
//                         { session: false },
//                         async (error) => {
//                             if (error) return next(error);
//
//                             const body = { _id: user._id, email: user.email };
//                             const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);
//
//                             return res.json({ token });
//                         }
//                     );
//                 } catch (error) {
//                     return next(error);
//                 }
//             }
//         )(req, res, next);
//     }
// );

module.exports = router;