import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  gatewayId: String,
  networkId: String,
  transmitterId: String,
});

export default transactionSchema;
