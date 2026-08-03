const mysql = require('mysql2/promise');
// Ele importa o mysql com a versão mais recente com o promisse
require('dotenv').config();

const connection = mysql.createPool({
    // o createPool traz a lista de conexões

    host: process.env.mysql_HOST,
    user: process.env.mysql_USER,
    password: process.env.mysql_password,
    database: process.env.MYSQL_DB,

});

module.exports = connection;
// exporta o connection
