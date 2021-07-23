const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Configurando servidor com express
const app = express();
const port = process.env.PORT; //Abrindo na porta 5000 para não conflitar com o React (3000)

//Utilizando middlewares
app.use(cors());
app.use(express.json());

//Configurando conexão com o MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
const connection = mongoose.connection;

//Conexão estabelecida...
connection.once('open', () => {
    console.log("Conexão com o banco de dados estabelecida. Status = " + mongoose.connection.readyState);
});


const userRouter = require('./routes/users');
//--const exerciseRouter = require('./routes/exercises');

app.use('/users', userRouter);
//app.use('/exercises', exerciseRouter);


//Inicializando o servidor 
app.listen(port, () => {
    console.clear();
    console.log(`Servidor aberto na porta ${port}`);
});