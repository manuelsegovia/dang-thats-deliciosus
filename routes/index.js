const express = require('express');

const router = express.Router();
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getstores));
router.get('/stores', catchErrors(storeController.getstores));
router.get('/add', storeController.addStore);

router.post(
  '/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
router.post(
  '/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);
router.get('/stores/:id/edit', catchErrors(storeController.editStore));

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTags));

router.get('/tags/:tag', catchErrors(storeController.getStoresByTags));

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
// 1. validate registration data before sending data to mongo, see controller.validateRegister
// 2.- register the user(save in database)
// 3.- log them in
router.post(
  '/register',
  userController.validateRegister,
  userController.registerUser,
  authController.login
);

module.exports = router;