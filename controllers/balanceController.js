const express = require('express');
const balanceService = require('../services/balanceService');
const validateBalanceUpdate = require('../validators/balanceValidator');

const router = express.Router();

router.post('/update', validateBalanceUpdate, async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const newBalance = await balanceService.updateBalance(userId, amount);
        res.send({ newBalance });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
