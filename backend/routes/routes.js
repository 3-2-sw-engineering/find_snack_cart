const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const marketController = require('../controllers/marketController');
const commentController = require('../controllers/commentController');

router.post('/user', userController.createUser);
router.delete('/user/:user_id', userController.deleteUser);
router.get('/user/:user_id', userController.getUserInfo);
router.patch('/password', userController.changePassword);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/favor/:user_id', userController.getAllFavorites);
router.patch('/favor/add', userController.addFavorite);
router.patch('/favor/remove', userController.removeFavorite);

router.get('/market', marketController.getAllMarkets);
router.get('/market/:market_index', marketController.getMarketInfo);
router.post('/market', marketController.createMarket);
router.delete('/market/:market_index', marketController.deleteMarket);
router.patch('/market', marketController.editMarket);

router.get('/comment/attached/:market_index', commentController.getCommentsByMarketIdx)
router.get('/comment/:comment_id', commentController.getCommentInfo);
router.post('/comment', commentController.createComment);
router.delete('/comment/:comment_id', commentController.deleteComment);
router.patch('/comment', commentController.editComment);

module.exports = router;
