import mongoose from 'mongoose';
import TransactionModel from '../models/transactionModel';
import serializer from '../helpers/serializer';
import deserializer from '../helpers/deserializer';
import GatewayModel from '../models/gatewayModel';

class DatabaseManager {
  constructor() {
    this.DB_CONNECTION = 'localhost:27017/payYouNow_db';
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/payYouNow_db',
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  getGateways = async () => {
    const response = await GatewayModel.find();
    return response;
  };

  saveTransaction = async (gateway, network, transmitter) => {
    const parsedTransaction = serializer(gateway, network, transmitter);
    const newTransaction = new TransactionModel(parsedTransaction);
    const response = await newTransaction.save();
    return deserializer(response);
  };

  getTransactionFromDatabase = async transactionId => {
    const response = await TransactionModel.findById(transactionId).lean();
    if (!response) {
      throw new Error('Transaction doesnt exists');
    }
    return response;
  };

  deleteTransaction = async transactionId => {
    await TransactionModel.findByIdAndRemove(transactionId);
  };
}

export default new DatabaseManager();
