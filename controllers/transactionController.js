const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.deposit = async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.balance += amount;
    await user.save();

    await Transaction.create({ type: 'deposit', amount, from: user._id });

    res.json({ msg: 'Deposit successful', balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.balance < amount) return res.status(400).json({ msg: 'Insufficient balance' });

    user.balance -= amount;
    await user.save();

    await Transaction.create({ type: 'withdraw', amount, from: user._id });

    res.json({ msg: 'Withdrawal successful', balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.transfer = async (req, res) => {
  const { recipientEmail, amount } = req.body;
  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ email: recipientEmail });

    if (!receiver) return res.status(404).json({ msg: 'Recipient not found' });
    if (sender.balance < amount) return res.status(400).json({ msg: 'Insufficient balance' });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    await Transaction.create({ type: 'transfer', amount, from: sender._id, to: receiver._id });

    res.json({ msg: 'Transfer successful', balance: sender.balance });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ from: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
