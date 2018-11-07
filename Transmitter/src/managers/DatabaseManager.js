import mongoose from 'mongoose';
import CardSchema from '../models/CardSchema';

class DatabaseManager {
  constructor() {
    this.DB_CONNECTION = 'localhost:27017/transmitter_db';
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/transmitter_db',
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  addNewCard = async newCard => {
    const newTransaction = new CardSchema(newCard);

    await newTransaction.save(error => {
      if (error) {
        throw new Error('Error in the database');
      }
    });
  };

  validateCardIsEmitted = async card => {
    const response = await CardSchema.findOne({
      number: card.number,
      holderName: card.holderName,
      securityCode: card.securityCode,
    }).lean();
    if (!response) {
      throw new Error('Card not emitted by Transmitter');
    }
    return response;
  };

  addCardTransactions = async transaction => {
    const newTransaction = {
      amount: transaction.amount,
      date: transaction.date,
      status: 'OK',
    };
    CardSchema.transactions.push(newTransaction);
    await CardSchema.save();
  };

  updateCardTransactions = async (transactionId, status) => {
    const transaction = await CardSchema.transactions.id(transactionId);
    transaction.status = status;
    await CardSchema.save();
  };

  deleteCardTransactions = async transactionId => {
    const amount = await CardSchema.transactions.id(transactionId).amount;
    const removed = await CardSchema.transactions.id(transactionId).remove();
    console.log(removed);
    return amount;
  };

  updateCardBalance = async (transactionId, amount) => {
    await CardSchema.update(
      { number: transactionId },
      { $inc: { balance: amount } },
    );
  };
}

export default new DatabaseManager();
