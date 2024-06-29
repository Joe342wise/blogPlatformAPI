const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'blogPlatform'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to the database')
});

module.exports = connection