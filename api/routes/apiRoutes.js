const express = require('express');
const router = express.Router();

// Importing the controllers
const { BookResources } = require('../resources');

router.use('/books', BookResources);

module.exports = router;