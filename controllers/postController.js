const db = require('../config/dbConfig');

// Retrive a list of all blog posts
exports.getAllPosts = (req, res) => {
    const query = 'SELECT * FROM tblPost';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Create a new blog post
exports.createPost = (req, res) => {
    const { userID, postTitle, postContent, catID } = req.body;
    const query = 'INSERT INTO tblPost (userID, postTitle, postContent, catID) VALUES (?, ?, ?, ?)';
    db.query(query, [userID, postTitle, postContent, catID], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, userID, postTitle, postContent, catID });
    });
};

// Retrieve a list of all blog posts
// exports.getAllPosts = (req, res) => {
//     const query = `
//         SELECT p.postID, p.postTitle, p.postContent, u.userName AS author, c.catName AS category, p.postCreatedAt
//         FROM tblPost p
//         JOIN tblUser u ON p.userID = u.userID
//         JOIN tblCategory c ON p.catID = c.catID
//     `;
//     db.query(query, (err, results) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(results);
//     });
// };

// Retrieve details of a specific blog post
exports.getPostById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT p.postID, p.postTitle, p.postContent, u.userName AS author, c.catName AS category, p.postCreatedAt, p.postUpdatedAt
        FROM tblPost p
        JOIN tblUser u ON p.userID = u.userID
        JOIN tblCategory c ON p.catID = c.catID
        WHERE p.postID = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(results[0]);
    });
};

// Update an existing blog post
exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { postTitle, postContent, catID } = req.body;
    const query = 'UPDATE tblPost SET postTitle = ?, postContent = ?, catID = ?, postUpdatedAt = CURRENT_TIMESTAMP WHERE postID = ?';
    db.query(query, [postTitle, postContent, catID, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json({ message: 'Post updated successfully' });
    });
};

// Delete a blog post
exports.deletePost = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tblPost WHERE postID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json({ message: 'Post deleted successfully' });
    });
};

// Retrieve a list of all blog posts with their authors and categories
exports.getAllPostsWithAuthorsAndCategories = (req, res) => {
    const query = `
        SELECT p.postID, p.postTitle, p.postContent, u.userName AS author, c.catName AS category, p.postCreatedAt
        FROM tblPost p
        JOIN tblUser u ON p.userID = u.userID
        JOIN tblCategory c ON p.catID = c.catID
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// View all comments on a blog post with commenters' names
exports.getCommentsForPost = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT c.commentID, c.commentContent, u.userName AS commenter, c.commentCreatedAt
        FROM tblComment c
        JOIN tblUser u ON c.userID = u.userID
        WHERE c.postID = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// View all blog posts with their tags
exports.getAllPostsWithTags = (req, res) => {
    const query = `
        SELECT p.postID, p.postTitle, t.tagName
        FROM tblPost p
        JOIN tblPostTag pt ON p.postID = pt.postID
        JOIN tblTag t ON pt.tagID = t.tagID
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// Search blog posts by keyword in title or content
exports.searchPostsByKeyword = (req, res) => {
    const { keyword } = req.query;
    const query = `
        SELECT p.postID, p.postTitle, p.postContent, u.userName AS author, c.catName AS category, p.postCreatedAt
        FROM tblPost p
        JOIN tblUser u ON p.userID = u.userID
        JOIN tblCategory c ON p.catID = c.catID
        WHERE p.postTitle LIKE ? OR p.postContent LIKE ?
    `;
    db.query(query, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// Count the number of posts by each user
exports.countPostsByUser = (req, res) => {
    const query = `
        SELECT u.userName, COUNT(p.postID) AS postCount
        FROM tblUser u
        JOIN tblPost p ON u.userID = p.userID
        GROUP BY u.userName
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};
