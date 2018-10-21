const mongoose = require('mongoose');

const CardDateTransactionsSchema = new mongoose.Schema({
  cardNumber: Number,
  Date: Number,
});

export default mongoose.model(
  'CardDateTransactions',
  CardDateTransactionsSchema,
);
