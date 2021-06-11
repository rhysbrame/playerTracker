const express = require('express');
const router = express.Router();
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper');
const stadia = require('../controllers/stadia');

router.get('/', catchAsyncWrapper(stadia.index));

module.exports = router;
