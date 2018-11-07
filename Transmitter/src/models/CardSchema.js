import mongoose from 'mongoose';
import TransactionSchema from './TransactionSchema';

const CardSchema = new mongoose.Schema({
  number: Number,
  expirationDate: String,
  holderName: String,
  securityCode: String,
  balance: Number,
  transactions: [TransactionSchema],
});

export default mongoose.model('Cards', CardSchema);
