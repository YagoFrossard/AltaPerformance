const router = require('express').Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");

require('dotenv').config();

// const {
//     getToken,
//     //COOKIE_OPTIONS,
//     getRefreshToken,
//     verifyUser,
// } = require("../authenticate");

// router.post("/login", passport.authenticate("local"), (req, res, next) => {
//     const token = getToken({ _id: req.user._id });
//     const refreshToken = getRefreshToken({ _id: req.user._id });
//     User.findById(req.user._id).then(
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

// router.route('/login').post((req, res, next) => {
//     passport.authenticate('local',function(err, user, info)  {
//         if(err){
//             return res.status(400).json({errors: "Erro"});
//         }
//         if(!user){
//             return res.status(400).json({errors: "Usuário não validado"});
//         }
//         req.logIn(user, { session: false}, function(err) {
//             if(err){
//                 return res.status(400).json({errors: err});
//             }
//
//             const body = { _id: user._id, email: user.email };
//             const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);
//
//             return res.json({ token });
//
//             // return res.status(200).json({success: `Logado como ${user.id}`});
//         });
//     })(req, res, next);
// });

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