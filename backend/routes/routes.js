const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/user', userController.createUser);
router.delete('/user', userController.deleteUser);
router.get('/user/:user_id', userController.getUserInfo);
router.patch('/password', userController.changePassword);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.patch('/user/favor/add', userController.addFavorite);
router.patch('/user/favor/remove', userController.removeFavorite);

module.exports = router;