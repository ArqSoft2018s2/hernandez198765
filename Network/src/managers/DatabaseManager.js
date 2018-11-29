import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CardDateTransactionsSchema from '../models/CardDateTransactionsSchema';
import status from '../helpers/status';

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
    const count = await CardDateTransactionsSchema.count({
      cardNumber: number,
      date: {
        $gt: threeDaysAgo,
        $lt: today,
      },
      status: status.OK,
    }).lean();
    return count;
  };

  sendCardDateTransaction = async cardDateTransaction => {
    const newCardDateTransaction = new CardDateTransactionsSchema(
      cardDateTransaction,
    );
    const response = await newCardDateTransaction.save();
    return response;
  };

  deleteTransaction = async transactionId => {
    await CardDateTransactionsSchema.findByIdAndUpdate(transactionId, {
      status: status.DELETED,
    });
  };
}

export default new DatabaseManager();
