import mongoose from 'mongoose';
import TransactionSchema from '../models/TransactionSchema';

class DatabaseManager {
  constructor() {
    this.DB_CONNECTION = 'localhost:27017/commerce_db';
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/commerce_db',
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  sendNewTransaction = (transaction, callback) => {
    const newTransaction = new TransactionSchema(transaction);

    newTransaction.save((error, databaseResponse) => {
      if (error) {
        callback(500, 'Error');
      } else {
        callback(200, databaseResponse);
      }
    });
  };
}

export default new DatabaseManager();
