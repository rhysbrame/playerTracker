const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const users = require('../controllers/users.js');

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsyncWrapper(users.register));

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      faliureRedirect: '/login',
      failureFlash: true,
    }),
    users.login
  );

router.get('/logout', users.logout);

module.exports = router;
