const mongoose = require('mongoose');

require('dotenv').config();

const mongooseConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database Connected Successfully');
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = mongooseConnect;