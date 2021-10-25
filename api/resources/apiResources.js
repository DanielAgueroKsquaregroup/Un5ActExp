// Modules
const express = require('express');
const BookResources = express.Router();
const { validateInfo } = require('../validator/index');

// Controllers
const { BookControllers } = require('../controllers')

BookResources.get('/', BookControllers.getAll);
BookResources.post('/', validateInfo, BookControllers.createBook);
BookResources.get('/:guid', BookControllers.getByGuid);
BookResources.put('/:guid', validateInfo, BookControllers.updateBook);
BookResources.delete('/:guid', BookControllers.deleteBook);

module.exports = BookResources;