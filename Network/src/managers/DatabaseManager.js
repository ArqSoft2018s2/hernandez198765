import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CardDateTransactionsSchema from '../models/CardDateTransactionsSchema';

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

  getQuantityOfTransactionsBetweenHours = number => {
    CardDateTransactionsSchema.countDocuments(
      { cardNumber: number },
      (error, count) => (error ? console.log('Error') : count),
    );
  };

  sendCardDateTransaction = cardDateTransaction => {
    const newCardDateTransaction = new CardDateTransactionsSchema(
      cardDateTransaction,
    );

    newCardDateTransaction.save((error, databaseResponse) => {
      if (error) {
        console.log('Error');
      } else {
        console.log(databaseResponse);
      }
    });
  };
}

export default new DatabaseManager();
