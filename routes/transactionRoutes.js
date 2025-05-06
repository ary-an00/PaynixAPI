const express = require('express');
const router = express.Router();
const { deposit, withdraw, transfer, getTransactions } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.post('/deposit', auth, deposit);
router.post('/withdraw', auth, withdraw);
router.post('/transfer', auth, transfer);
router.get('/history', auth, getTransactions);

module.exports = router;
