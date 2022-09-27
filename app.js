const express = require('express');

const mongooseConnect = require('./utils/database');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts')

const app = express();
app.use(express.json());

port = process.env.PORT;

app.use('/user', userRoutes);
app.use('/post', postRoutes);

mongooseConnect();

app.listen(port);