const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const postTagRoutes = require('./routes/postTagRoutes');

const app = express();
const PORT = process.env.PORT || 3306;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);
app.use('/tags', tagRoutes);
app.use('/postTags', postTagRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
