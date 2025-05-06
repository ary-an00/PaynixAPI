const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: String, // deposit, withdraw, transfer
  amount: Number,
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
