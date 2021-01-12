const express = require('express');
const app = express();
const MySQL = require('mysql');
const cors = require('cors')

const HOST = '92.53.96.146';
const DB_USER = 'cl98835_el';
const PASSWORD = 'N3MntYQG';
const DB_NAME = 'cl98835_el';

const PORT = 4000;

const mysql = MySQL.createPool({
    port: 3306,
    connectionLimit: 5,
    host: HOST,
    user: DB_USER,
    password: PASSWORD,
    database: DB_NAME
});

app.use(cors())

app.get('/getSanatoriums', function(request, reply){

    mysql.getConnection(function(err, connection) {
        console.log('Hello');
        connection.query('SELECT title, address, icons, coordinates  FROM sanatorium',
        function (error, results, fields) {

            connection.release();
            if (error) console.log(error);

            reply.send(results);
        });
    })
})

app.listen(PORT, error => {

    error ? console.log(error) : console.log("Server started!!!");
});