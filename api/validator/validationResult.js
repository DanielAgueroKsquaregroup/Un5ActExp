const { validationResult } = require('express-validator');

const validated = (req, res, next) => {
    try{
        validationResult(req).throw();
        return next();
    } catch (err) {
        res.send({ error: err.array() });
    }
};

module.exports = {
    validated
};