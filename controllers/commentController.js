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

// View all comments on a blog post with commenters' names
exports.getCommentsForPost = (req, res) => {
    const { postId } = req.params;
    const query = `
        SELECT c.commentID, c.commentContent, u.userName AS commenter, c.commentCreatedAt
        FROM tblComment c
        JOIN tblUser u ON c.userID = u.userID
        WHERE c.postID = ?
    `;
    db.query(query, [postId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};
