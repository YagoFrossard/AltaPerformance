const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config();

//Called during login/sign up.
//passport.use('local',User.createStrategy());
//passport.use('local',new LocalStrategy(User.authenticate()));

//Usando LocalStrategy do passport
passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        (email, password, done) => {
            //Procurar usuário no banco de dadoss
            User.findOne({ email: email })
                .then(user => {
                    if(!user){
                        return done(null, false, { message: "Credenciais inválidas."})
                    }
                    const isMatch = bcrypt.compareSync(password, user.password);
                    if (isMatch) {
                        return done(null, user, { message: "Logado com sucesso."});
                    } else {
                        return done(null, false, { message: "Credenciais inválidas." });
                    }
                })
                .catch(err => {
                    console.log("Não achou a porra do usuário");
                    return done(null, err, { message: "Ocorreu algum erro inesperado." });
                });
        })
);


//called while after logging in / signing up to set user details in req.user
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOKEN_SECRET,
            jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromAuthHeaderAsBearerToken(),ExtractJWT.fromUrlQueryParameter("secret_token"), ExtractJWT.fromHeader("secret_token")])
        },
        // Check against the DB only if necessary.
         async (token, done) => {
            try {
                User.findOne({ _id: token.user._id },(err, user) => {
                    if(err)     return done(err);
                    if(user)    return done(null, user);
                    if(!user)   return done(null,false,{message:"Não  encontrado"})
                })
            } catch (error) {
                return done(error);
            }
        }
    )
);

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

// //Usando LocalStrategy do passport
// passport.use(
//     new LocalStrategy({ usernameField: 'email' },
//     (email, password, done) => {
//     //Procurar usuário no banco de dados
//     User.findOne({ email: email })
//         .then(user => {
//             if(!user){
//                 return done(null, false, { message: "Credenciais inválidas."})
//             }
//             const isMatch = user.isValidPassword(password);//bcrypt.compareSync(password, user.password);
//             if (isMatch) {
//                 return done(null, user, { message: "Logado com sucesso."});
//             } else {
//                 return done(null, false, { message: "Credenciais inválidas." });
//             }
//         })
//         .catch(err => {
//             return done(null, err, { message: "Ocorreu algum erro inesperado." });
//         });
//     })
// );

// passport.use(
//     'signup',
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         async (email, password, done) => {
//             await User.create({email, password})
//                 .then(user => {
//                     done(null, user, {message: "Usuário criado."});
//                 })
//                 .catch(err => {
//                     return done(null, err, {message: "Ocorreu algum erro inesperado."});
//                 });
//         }
//     )
// );

module.exports = passport;