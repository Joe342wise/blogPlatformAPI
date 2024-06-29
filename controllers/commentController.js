const db = require('../config/dbConfig');

exports.getAllComments = (req, res) => {
    const query = 'SELECT * FROM tblComment';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createComment = (req, res) => {
    const { postID, userID, commentContent } = req.body;
    const query = 'INSERT INTO tblComment (postID, userID, commentContent) VALUES (?, ?, ?)';
    db.query(query, [postID, userID, commentContent], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, postID, userID, commentContent });
    });
};
