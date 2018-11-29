import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  RUT: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
});

export default mongoose.model('Transaction', TransactionSchema);
