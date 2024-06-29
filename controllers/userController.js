const db = require('../config/dbConfig');

exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM tblUser';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createUser = (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    const query = 'INSERT INTO tblUser (userName, userEmail, userPassword) VALUES (?, ?, ?)';
    db.query(query, [userName, userEmail, userPassword], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, userName, userEmail });
    });
};
