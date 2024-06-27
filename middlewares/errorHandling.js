function errorHandlingMiddleware(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
}

module.exports = errorHandlingMiddleware;
