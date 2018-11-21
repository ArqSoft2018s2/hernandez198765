import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  RUT: { type: Number, required: true },
  gateway: {
    idGateway: { type: String, required: true },
    idTransaction: { type: String, required: true },
  },
  network: {
    idNetwork: { type: String, required: true },
    idTransaction: { type: String, required: true },
  },
  transmitter: {
    idTransmitter: { type: String, required: true },
    idTransaction: { type: String, required: true },
  },
  status: { type: String, required: true },
});

export default transactionSchema;
