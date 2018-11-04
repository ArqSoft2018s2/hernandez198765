import mongoose from 'mongoose';
import TransactionSchema from '../models/transactionSchema';

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

  saveTransaction = async transaction => {
    const newTransaction = new TransactionSchema(transaction);

    const response = await newTransaction.save();
    if (!response) {
      throw new Error('Error papi');
    }
    return response;
  };
}

export default new DatabaseManager();
