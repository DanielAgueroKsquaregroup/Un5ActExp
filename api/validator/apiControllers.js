const { body } = require('express-validator');
const { validated } = require('./validationResult');
// const { Book } = require('../models/apiModels');

const validateInfo = [
    body('title').
    notEmpty().
    withMessage("Title can not be empty").
    bail().
    isString().
    withMessage("Title must be an string").
    bail(),
    body('author').
    notEmpty().
    withMessage("Author can not be empty").
    bail().
    isString().
    withMessage("Author must be an string").
    bail(),
    body('year').
    notEmpty().
    withMessage("Number can not be empty").
    bail().
    isInt({ min: 1454, max: new Date().getFullYear() }).
    withMessage("Year must be between 1454 and current year").
    bail(),
    (req, res, next) => {
        validated(req, res, next);
    }
];

module.exports = { validateInfo };