function validateBalanceUpdate(req, res, next) {
    const { userId, amount } = req.body;
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).send({ error: "Invalid userId. Must be a positive integer." });
    }
    if (!Number.isInteger(amount)) {
        return res.status(400).send({ error: "Invalid amount. Must be an integer." });
    }
    next();
}

module.exports = validateBalanceUpdate;
