const { handleError } = require('../utils/errorHandler');

function errorHandlingMiddleware(err, req, res, next) {
    handleError(err, req, res, next);
}

module.exports = errorHandlingMiddleware;
