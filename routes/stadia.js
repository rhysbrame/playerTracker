const express = require('express');
const router = express.Router();
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper');
const { isLoggedIn } = require('../utilities/middleware');
const stadia = require('../controllers/stadia');

router.get('/', catchAsyncWrapper(stadia.index));

router.get('/:id', isLoggedIn, catchAsyncWrapper(stadia.details));

module.exports = router;
