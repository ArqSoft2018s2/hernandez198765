import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  gateway: {
    idGateway: String,
    idTransaction: String,
  },
  network: {
    idNetwork: String,
    idTransaction: String,
  },
  transmitter: {
    idTransmitter: String,
    idTransaction: String,
  },
});

export default transactionSchema;
