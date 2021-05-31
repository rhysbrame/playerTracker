const express = require('express');
const router = express.Router();

const teams = require('../controllers/teams');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper.js');
const { isLoggedIn } = require('../utilities/middleware');

router.get('/', catchAsyncWrapper(teams.index));

router.get('/:id', isLoggedIn, catchAsyncWrapper(teams.details));

module.exports = router;
