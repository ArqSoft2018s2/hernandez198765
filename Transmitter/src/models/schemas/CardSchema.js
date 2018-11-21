import mongoose from 'mongoose';
import TransactionSchema from './TransactionSchema';

const CardSchema = new mongoose.Schema({
  number: Number,
  expirationDate: String,
  holderName: String,
  securityCode: String,
  balance: Number,
  status: String,
  transactions: [TransactionSchema],
});

export default CardSchema;
