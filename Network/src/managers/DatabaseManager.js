import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import TransactionSchema from '../models/TransactionSchema';

class DatabaseManager {
  constructor() {
    dotenv.config();
    this.DB_CONNECTION = process.env.DATABASE_IP;
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        `mongodb://${this.DB_CONNECTION}`,
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  // sendNewTransaction = (transaction, callback) => {
  //   const newTransaction = new TransactionSchema(transaction);

  //   newTransaction.save((error, databaseResponse) => {
  //     if (error) {
  //       callback(500, 'Error');
  //     } else {
  //       callback(200, databaseResponse);
  //     }
  //   });
  // };
}

export default new DatabaseManager();
