const express = require('express');
const catchAsyncWrapper = require('../utilities/catchAsyncWrapper');
const router = express.Router();
const stadia = require('../controllers/stadia');

router.get('/', catchAsyncWrapper(stadia.index));

module.exports = router;
