const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

router.post('/createUser', userController.createUser);
router.get('/userProfile/:id', userController.userProfile);
router.post('/follow/:id/:followingId', userController.following);
router.post('/unfollow/:id/:unfollowedId', userController.unfollow);

module.exports = router;