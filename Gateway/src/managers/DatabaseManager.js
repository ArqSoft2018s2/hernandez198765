import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TransactionSchema from '../models/transactionSchema';
import serializer from '../helpers/serializer';
import deserializer from '../helpers/deserializer';

class DatabaseManager {
  constructor() {
    dotenv.config();
    this.DB_CONNECTION = process.env.DATABASE_IP;
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/gateway_db',
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  saveTransaction = async transaction => {
    const parsedTransaction = serializer(transaction);
    const newTransaction = new TransactionSchema(parsedTransaction);
    const response = await newTransaction.save();
    return deserializer(response);
  };
}

export default new DatabaseManager();
