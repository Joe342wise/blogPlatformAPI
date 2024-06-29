const db = require('../config/dbConfig');

exports.getAllCategories = (req, res) => {
    const query = 'SELECT * FROM tblCategory';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createCategory = (req, res) => {
    const { catName } = req.body;
    const query = 'INSERT INTO tblCategory (catName) VALUES (?)';
    db.query(query, [catName], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, catName });
    });
};
