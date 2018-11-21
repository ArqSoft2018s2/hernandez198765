const mongoose = require('mongoose');

const CardDateTransactionsSchema = new mongoose.Schema({
  cardNumber: Number,
  date: Number,
  status: String,
});

export default mongoose.model(
  'CardDateTransactions',
  CardDateTransactionsSchema,
);
