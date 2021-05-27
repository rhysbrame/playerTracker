const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsyncWrapper(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash('success', 'Welcome!!');
        res.redirect('/');
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/register');
    }
  })
);

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    faliureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    req.flash('success', 'Welcome back you!');
    const redirectUrl = req.session.returnTo || '/teams';
    res.redirect(redirectUrl);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have signed out!');
  res.redirect('/');
});

module.exports = router;
