import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Number,
  status: String,
});

export default TransactionSchema;
