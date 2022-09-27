const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const schema = mongoose.Schema;

const user = new schema ({
    fullname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followers: {
        type:Array,
        default:[]
    },
    following: {
        type:Array,
        default:[]
    },
    likedPosts: {
        type:Array,
        default:[]
    },
}, {timestamps: true});

module.exports = mongoose.model('Users', user);