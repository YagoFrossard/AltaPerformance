const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

//Usando LocalStartegy do passport
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        //Procurar usuário no banco de dados
        User.findOne({ email: email })
            .then(user => {
                if(!user){
                    return done(null, false, { message: "Credenciais inválidas"})
                }
                var isMatch = bcrypt.compareSync(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Credenciais inválidas" });
                }
            })
            .catch(err => {
                return done(null, false, { message: "Ocorreu algum erro inesperado" });
            });
    })
);

module.exports = passport;