//Usar qualquer software de get e post para testar o banco de dados

const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');
const passport = require("../passport/setup");
const salt = 3;

// const {
//     getToken,
//     //COOKIE_OPTIONS,
//     getRefreshToken,
//     verifyUser,
// } = require("../authenticate");

const jwt = require("jsonwebtoken");

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Erro: ${err}`));
});
//verifyUser //

router.get("/me", passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    res.send(req.user);
});

// router.route('/add').post((req, res) => {
//     //Gerando senha com hash
//     const email = req.body.email;
//     const password = bcrypt.hashSync(req.body.password, salt)
//     const name = req.body.name;
//     const telephone_number = req.body.telephone_number;
//     const user_type = req.body.user_type;
//
//     const newUser = new User({
//         email,
//         password,
//         name,
//         telephone_number,
//         user_type
//     });
//
//     newUser.save()
//         .then(() => res.json('Usuário adicionado!'))
//         .catch(err => res.status(400).json(`Erro: ${err}`));
// });

router.post("/signup", (req, res, next) => {
    // Verify that first name is not empty
    if (!req.body.email) {
        res.statusCode = 500;
        res.send({
            name: "EmailNotFound",
            message: "Email is required",
        });
    } else {
        const email = req.body.email;
        const password = req.body.password;
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
    }
});

router.route('/login').post((req, res, next) => {
    passport.authenticate(
        'local',
        {},
        function(err, user, info)  {
        if(err){
            return res.status(400).json({errors: "Erro"});
        }
        if(!user){
            return res.status(404).json({errors: "Usuário/Senha incorretos"});
        }
        req.logIn(user, { session: false}, function(err) {
            if(err){
                return res.status(400).json({errors: err});
            }

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

            return res.json({ token });
        });
    })(req, res, next);
});

// router.post(
//     '/login',
//     async (req, res, next) => {
//         passport.authenticate(
//             'local',
//             async (err, user, info) => {
//                 try {
//                     if (err || !user) {
//                         const error = new Error('An error occurredd.');
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

// router.get("/logout", verifyUser, (req, res, next) => {
//     const { signedCookies = {} } = req;
//     const { refreshToken } = signedCookies;
//     User.findById(req.user._id).then(
//         (user) => {
//             const tokenIndex = user.refreshToken.findIndex(
//                 (item) => item.refreshToken === refreshToken
//             );
//
//             if (tokenIndex !== -1) {
//                 user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
//             }
//
//             user.save((err, user) => {
//                 if (err) {
//                     res.statusCode = 500;
//                     res.send(err);
//                 } else {
//                     res.clearCookie("refreshToken", COOKIE_OPTIONS);
//                     res.send({ success: true });
//                 }
//             });
//         },
//         (err) => next(err)
//     );
// });

module.exports = router;