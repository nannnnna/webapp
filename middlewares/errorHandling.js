function errorHandlingMiddleware(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err); // Логируем ошибку для внутреннего использования
    res.status(500).send({ error: "Internal Server Error" });
}

module.exports = errorHandlingMiddleware;
