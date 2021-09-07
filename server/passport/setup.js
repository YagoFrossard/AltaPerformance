const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

//Usando LocalStrategy do passport
passport.use(
    new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
    //Procurar usuário no banco de dados
    User.findOne({ email: email })
        .then(user => {
            if(!user){
                return done(null, false, { message: "Credenciais inválidas."})
            }
            const isMatch = user.isValidPassword(password);//bcrypt.compareSync(password, user.password);
            if (isMatch) {
                return done(null, user, { message: "Logado com sucesso."});
            } else {
                return done(null, false, { message: "Credenciais inválidas." });
            }
        })
        .catch(err => {
            return done(null, err, { message: "Ocorreu algum erro inesperado." });
        });
    })
);

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            await User.create({email, password})
                .then(user => {
                    done(null, user, {message: "Usuário criado."});
                })
                .catch(err => {
                    return done(null, err, {message: "Ocorreu algum erro inesperado."});
                });
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.TOKEN_SECRET,
            jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromUrlQueryParameter("secret_token"), ExtractJWT.fromHeader("secret_token"), ExtractJWT.fromAuthHeaderAsBearerToken()])
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

module.exports = passport;