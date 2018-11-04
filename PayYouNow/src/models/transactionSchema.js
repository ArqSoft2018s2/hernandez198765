import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  gatewayId: String,
  networkId: String,
  transmitterId: String,
  amount: Number,
});

export default mongoose.model('Transaction', TransactionSchema);
