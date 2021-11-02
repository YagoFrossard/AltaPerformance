const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./passport/setup');
const path = require("path");

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

const sessionSecret = process.env.SESSION_SECRET;

//Configurando o CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['POST','PUT','OPTIONS','GET','HEAD']
}));

// 'Parser' para as requisições que tenham conteúdo em 'application/json'
app.use(express.json());

// 'Parser' para as requisições que tenham conteúdo em 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// Configura um SessionStorage (Não vamos usar este método 🙃 )
// app.use(
//     session({
//         secret: sessionSecret,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({mongoUrl: uri}),
//         cookie: {
//             maxAge: 15 * 60 * 1000
//         }
//     })
// );

//Usando o middleware do passport
app.use(passport.initialize());
//app.use(passport.session());

app.get('/', (req, res, next) => {
    // if(req.user){
    //     res.send({"name": req.user.name, "userType": req.user.user_type});
    // }else{
    //     res.send({'name': 'not logged'});

    res.send({status: "sucesso"});
    next();
});

app.get('/isAuthenticated', (req, res, next) => {
    res.send({"isAuth": req.isAuthenticated()});
    next();
})

app.get('/logout', (req, res, next) => {
    req.logout();
    return res.status(200).json({success: 'Deslogado com sucesso'});
})

//Criando e definindo as rotas do sistema
const userRouter = require('./routes/users');
//const loginRouter = require('./routes/authenticate');
const secureRouter = require('./routes/secure-routes');
const exerciseRouter = require('./routes/exercises');

app.use('/user', userRouter);
//app.use('/auth', loginRouter);
app.use('/secure', passport.authenticate('jwt', { session: false }), secureRouter);
app.use('/exercises', exerciseRouter);

// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")));

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Inicializando o servidor 
app.listen(port, () => {
    console.log(`Servidor aberto na porta ${port}`);
});