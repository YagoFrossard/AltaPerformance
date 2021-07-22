const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Configurando servidor com express
const app = express();
const port = process.env.PORT || 5000; //Abrindo na porta 5000 para não conflitar com o React (3000)

//Utilizando middlewares
app.use(cors);
app.use(express.json());

//Configurando conexão com o MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true});
const connection = mongoose.connection;

//Conexão estabelecida...
connection.once('open', () => {
    console.log("Conexão com o banco de dados estabelecida.");
});

/*
const adminRouter = require('./routes/administrator.js');
const profRouter = require('./routes/professor.js');

app.use('/administrador', adminRouter);
app.use('/professores', profRouter);
*/

//Inicializando o servidor 
app.listen(port, () => {
    console.clear();
    console.log(`Servidor aberto na porta ${port}`);
});