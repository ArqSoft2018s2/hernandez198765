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

  getQuantityOfTransactionsBetweenHours = async (
    number,
    today,
    threeDaysAgo,
  ) => {
    let response;
    await CardDateTransactionsSchema.find(
      { cardNumber: number },
      (error, cardDateTransactions) => {
        if (error) {
          throw new Error(error);
        } else {
          response = cardDateTransactions.filter(
            cardDateTransaction =>
              cardDateTransaction.date < today &&
              cardDateTransaction.date > threeDaysAgo,
          ).length;
        }
      },
    );
    return response;
  };

  sendCardDateTransaction = cardDateTransaction => {
    const newCardDateTransaction = new CardDateTransactionsSchema(
      cardDateTransaction,
    );

    newCardDateTransaction.save((error, databaseResponse) => {
      if (error) {
        throw new Error('Error');
      }
    });
  };
}

export default new DatabaseManager();
