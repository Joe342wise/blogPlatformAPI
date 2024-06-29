const db = require('../config/dbConfig');

exports.getAllPostTags = (req, res) => {
    const query = 'SELECT * FROM tblPostTag';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.createPostTag = (req, res) => {
    const { postID, tagID } = req.body;
    const query = 'INSERT INTO tblPostTag (postID, tagID) VALUES (?, ?)';
    db.query(query, [postID, tagID], (err, results) => {
        if (err) throw err;
        res.json({ postID, tagID });
    });
};
