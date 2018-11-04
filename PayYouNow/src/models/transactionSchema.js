import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  idGateway: String,
  idNetwork: String,
  idTransmitter: String,
});

export default mongoose.model('Transaction', TransactionSchema);
