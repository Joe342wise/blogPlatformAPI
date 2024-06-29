const db = require('../config/dbConfig');

exports.getAllPosts = (req, res) => {
    const query = 'SELECT * FROM tblPost';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createPost = (req, res) => {
    const { userID, postTitle, postContent, catID } = req.body;
    const query = 'INSERT INTO tblPost (userID, postTitle, postContent, catID) VALUES (?, ?, ?, ?)';
    db.query(query, [userID, postTitle, postContent, catID], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, userID, postTitle, postContent, catID });
    });
};
