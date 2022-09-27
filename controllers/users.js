const bcrypt = require('bcrypt');
const user = require('../models/user');

exports.userProfile = async(req, res) => {
    const {id: userId} = req.params;
    try{
       const profile = await user.findById(userId);
       if(!profile){
            return res.status(400).json({
                message: 'No User With This Id'
            });
       }else{
            res.status(200).json({
                message: 'User Fetched Successfully',
                result: profile
            });
       }
    }catch(err){
        res.status(400).json({
            message: 'Error fetching user',
            error: err
        });
    };
};

exports.createUser = async (req, res) => {
    try{
        const userEmail = await user.findOne({email: req.body.email});
        const password = await bcrypt.hash(req.body.password, 10);

        if(userEmail){
            return res.status(400).json({
                message: 'Email Aready In Use'
            });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                message: 'Passwords Do Not Match'
            })
        }
        const createUser = new user({
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            password: password
        });
        await createUser.save();
        return res.status(200).json({
            message: 'User created Successfully',
            result: createUser
        })
        
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Error Creating User',
            error: err
        })
    }
};

exports.following = async (req, res) => {
    const {id: userId, followingId:followingId} = req.params;
    try{
       const profile = await user.findById(userId);
       if(!profile){
            return res.status(400).json({
                message: 'No User With This Id'
            });
       }else{
        const followProfile = await user.findById(followingId);
        if(!followProfile){
             return res.status(400).json({
                 message: 'No User With This Id'
             });
        }else{
            if(profile.following.includes(followingId)){
                return res.status(400).json({
                    message: 'Already Following This User. Cannot Follow User Twice'
                });
            }else{
                followProfile.followers.push(userId)
                profile.following.push(followingId)
                profile.save();
                followProfile.save()
                return res.status(200).json({msg:"User Followed", result: profile});
            }
        }
    }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: 'Error Following User',
            error: err
        });
    };
};

// unfollowing User
exports.unfollow = async (req, res) => {
    const {id: userId, unfollowedId: unfollowedId} = req.params;
    try{
        const userProfile = await user.findById(userId);
        if(!userProfile){
            return res.status(400).json({
                msg: 'No User With This Id',
                error: err
            });
        }else{
            const unfollowProfile = await user.findById(unfollowedId);
            if(!unfollowProfile){
                return res.status(400).json({
                    msg: 'No User With This Id',
                    error: err
                });
            }else{
                userProfile.following.pull(unfollowedId);
                unfollowProfile.followers.pull(userId);
                unfollowProfile.save();
                userProfile.save();
                return res.status(200).json({msg: 'Unfollowed User Successfully', result: userProfile})
            };
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            msg: 'Error Unfollowing This User',
            error: err
        });
    }
};
