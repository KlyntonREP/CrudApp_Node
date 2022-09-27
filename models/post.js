const mongoose = require('mongoose');
const schema = mongoose.Schema;

const post = new schema ({
    caption: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    }
},
{timestamps: true}
);

module.exports = mongoose.model('posts', post);