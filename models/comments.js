const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = require('./user.js')

const comments = new schema({
    comment: {
        type: String,
        required: true
    },
    postID:{
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
},
{timestamps: true });

module.exports = mongoose.model('Comments', comments);