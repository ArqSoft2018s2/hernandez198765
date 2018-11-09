import mongoose from 'mongoose';
import TransactionSchema from '../models/transactionSchema';
import serializer from '../helpers/serializer';
import deserializer from '../helpers/deserializer';

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

  saveTransaction = async (gateway, network, transmitter) => {
    const parsedTransaction = serializer(gateway, network, transmitter);
    const newTransaction = new TransactionSchema(parsedTransaction);
    const response = await newTransaction.save();
    return deserializer(response);
  };

  getTransactionFromDatabase = async transactionId => {
    const response = await TransactionSchema.findById(transactionId).lean();
    if (!response) {
      throw new Error('Transaction doesnt exists');
    }
    return response;
  };

  deleteTransaction = async transactionId => {
    await TransactionSchema.findByIdAndRemove(transactionId);
  };
}

export default new DatabaseManager();
