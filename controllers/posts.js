const post = require('../models/post');
const user = require('../models/user');
const comments = require('../models/comments');

exports.createPost = async (req, res) => {
    try{
        const addPost = new post({
            caption: req.body.caption,
            media: req.body.imageUrl
        });
        await addPost.save();
        return res.status(200).json({
            message: 'Post Created Successfully',
            result: addPost
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Error Creating Post',
            error: err
        })
    }
};

exports.addComment = async (req, res) => {
    const {id: userId, postId: postId} = req.params;
    try{
        const userProfile = await user.findById(userId);
        if(!userProfile){
            res.status(400).json({
                msg: 'No User With This Id',
                error: err
            });
        }else{
            const postWithId = await post.findById(postId);
            if(!postWithId){
                res.status(400).json({
                    msg: 'No Post With This Id',
                    error: err
                });
            }else{
                const postComment = new comments({
                    comment: req.body.comment,
                    postID: postId,
                    userID: userId
                });
                postWithId.comments.push(postComment)
                postWithId.save();
                postComment.save();
                return res.status(200).json({
                    msg: 'Comment Posted Successfully',
                    result: postComment
                });
            }

        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg: 'Error Adding Comment',
            error: err
        });
    };
};


exports.likePost = async (req, res) => {
    const {id: userId, postId: postId} = req.params;
    try{
        const userProfile = await user.findById(userId);
        if(!userProfile){
            return res.status(400).json({
                msg: 'No User With This ID'
            });
        }else{
            const postDetails = await post.findById(postId)
            if (!postDetails) {
                return res.status(400).json({
                    msg: 'No Post With This ID'
                });
            }else{
                postDetails.likes.push(userId);
                userProfile.likedPosts.push(postId);
                userProfile.save();
                postDetails.save();
                return res.status(200).json({
                    msg: 'Post Liked Successfully',
                    result: postDetails
                });
            }
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg: 'Error Liking This Post',
            error: err
        });
    }
};

exports.likeComments = async (req, res) => {
    const {id: userId, commentId: commentId} = req.params;
    try{
        const userProfile = await user.findById(userId);
        if(!userProfile){
            return res.status(400).json({
                msg: 'No User With This ID',
            });
        }else{
            const commentDetails = await comments.findById(commentId)
            if (!commentDetails) {
                return res.status(400).json({
                    msg: 'No Comment With This ID'
                });
            }else{
                commentDetails.likes.push(userId);
                commentDetails.save();
                return res.status(200).json({
                    msg: 'Comment Liked Successfully',
                    result: commentDetails
                });
            }
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg: 'Error Liking This Comment',
            error: err
        });
    }
};

