const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./passport/setup');

require('dotenv').config();

//Configurando servidor com express
const app = express();
const port = process.env.PORT; //Abrindo na porta 5000 para não conflitar com o React (3000)

//Configurando conexão com o MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
const connection = mongoose.connection;

//Conexão estabelecida...
connection.once('open', () => {
    console.log(`Conexão com o banco de dados estabelecida. Status = ${mongoose.connection.readyState}`);
});

//Utilizando middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(
    session({
        secret: 'auth-token',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl: uri})
    })
);

//Usando o middleware do passport
app.use(passport.initialize());
app.use(passport.session());

//Criando e definindo as rotas do sistema
const userRouter = require('./routes/users');
const loginRouter = require('./routes/authenticate');
//const exerciseRouter = require('./routes/exercises');

app.use('/users', userRouter);
app.use('/auth', loginRouter);
//app.use('/exercises', exerciseRouter);

//Inicializando o servidor 
app.listen(port, () => {
    console.log(`Servidor aberto na porta ${port}`);
});