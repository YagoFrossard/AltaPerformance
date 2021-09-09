//Usar qualquer software de get e post para testar o banco de dados

const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');
const passport = require("../passport/setup");
const salt = 3;

const {
    getToken,
    //COOKIE_OPTIONS,
    getRefreshToken,
    verifyUser,
} = require("../authenticate");
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
        const password = req.body.password;//bcrypt.hashSync(req.body.password, salt)
        const name = req.body.name;
        const telephone_number = req.body.telephone_number;
        const user_type = req.body.user_type;
        const username = req.body.username;

        const newUser = new User({
            email,
            password,
            name,
            telephone_number,
            user_type,
            username
        });

        newUser.save()
            .then(() => res.json('Usuário adicionado!'))
            .catch(err => res.status(400).json(`Erro: ${err}`));
        // User.register(
        //     new User({ username: req.body.username }),
        //     req.body.password,
        //     (err, user) => {
        //         if (err) {
        //             res.statusCode = 500;
        //             res.send(err);
        //         } else {
        //             user.firstName = req.body.firstName;
        //             user.lastName = req.body.lastName || "";
        //             const token = getToken({ _id: user._id });
        //             const refreshToken = getRefreshToken({ _id: user._id });
        //             user.refreshToken.push({ refreshToken });
        //             user.save((err, user) => {
        //                 if (err) {
        //                     res.statusCode = 500;
        //                     res.send(err);
        //                 } else {
        //                     res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
        //                     res.send({ success: true, token });
        //                 }
        //             });
        //         }
        //     }
        // );
    }
});

// router.route('/signup').post(async (req, res, next) => {
//     passport.authenticate('signup', { session: false });
//     res.json({
//         message: 'Usuário cadastrado com sucesso',
//         user: req.user
//     });
// });

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

// router.post("/login", passport.authenticate("local"), (req, res, next) => {
//     const token = getToken({ _id: req.user._id });
//     //const refreshToken = getRefreshToken({ _id: req.user._id });
//     User.findOne({email: req.user.email}).then(
//         (user) => {
//             //user.refreshToken.push({ refreshToken });
//             user.save((err, user) => {
//                 if (err) {
//                     res.statusCode = 500;
//                     res.send(err);
//                 } else {
//                     //res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
//                     res.send({ success: true, token });
//                 }
//             });
//         },
//         (err) => next(err)
//     );
// });

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