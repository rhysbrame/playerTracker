const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const users = require('../controllers/users.js');

router.get('/register', users.renderRegister);

router.post('/register', catchAsyncWrapper(users.register));

router.get('/login', users.renderLogin);

router.post(
  '/login',
  passport.authenticate('local', {
    faliureRedirect: '/login',
    failureFlash: true,
  }),
  users.login
);

router.get('/logout', users.logout);

module.exports = router;
