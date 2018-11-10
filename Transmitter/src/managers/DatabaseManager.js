import mongoose from 'mongoose';
import CardModel from '../models/CardModel';

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
    const newTransaction = new CardModel(newCard);

    await newTransaction.save(error => {
      if (error) {
        throw new Error('Error in the database');
      }
    });
  };

  findCard = async card => {
    const response = await CardModel.findOne({
      number: card.number,
      holderName: card.holderName,
      securityCode: card.securityCode,
    });
    if (!response) {
      throw new Error('Card not emitted by Transmitter');
    }
    return response;
  };

  validateCardIsEmitted = async card => {
    const response = await CardModel.findOne({
      number: card.number,
      holderName: card.holderName,
      securityCode: card.securityCode,
    }).lean();
    if (!response) {
      throw new Error('Card not emitted by Transmitter');
    }
    return response;
  };

  findCardByTransactionId = async transactionId => {
    const card = await CardModel.findOne({
      'transactions._id': transactionId,
    }).lean();
    return card;
  };

  addCardTransactions = async transaction => {
    const card = await this.findCard(transaction.card);
    const newTransaction = {
      amount: transaction.amount,
      date: transaction.date,
      status: 'OK',
    };
    card.transactions.push(newTransaction);
    const newCard = await card.save();
    return newCard.transactions[newCard.transactions.length - 1].id;
  };

  updateCardTransactions = async (transactionId, status) => {
    const card = await CardModel.findOne({ 'transactions._id': transactionId });
    const transaction = await card.transactions.id(transactionId);
    transaction.status = status;
    await card.save();
  };

  deleteCardTransactions = async transactionId => {
    const card = await CardModel.findOne({ 'transactions._id': transactionId });
    const amount = await card.transactions.id(transactionId).amount;
    const removed = await card.transactions.id(transactionId).remove();
    await card.save();
    return { amount, removed, number: card.number };
  };

  updateCardBalance = async (transactionId, amount) => {
    await CardModel.update(
      { number: transactionId },
      { $inc: { balance: amount } },
    );
  };
}

export default new DatabaseManager();
