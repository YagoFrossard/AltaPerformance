require('dotenv').config();
const env = process.env.ENVIRONMENT;
let link;

if(env == 'dev'){
    link = 'http://localhost:3000';
}else{
    link = 'https://alta-performance.herokuapp.com';
}

module.exports = link;