const db = require('../config/dbConfig');

exports.getAllTags = (req, res) => {
    const query = 'SELECT * FROM tblTag';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createTag = (req, res) => {
    const { tagName } = req.body;
    const query = 'INSERT INTO tblTag (tagName) VALUES (?)';
    db.query(query, [tagName], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, tagName });
    });
};
