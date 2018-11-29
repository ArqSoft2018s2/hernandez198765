import mongoose from 'mongoose';
import { promisify } from 'util';
import moment from 'moment';
import CardModel from '../models/CardModel';
import transactionStatus from '../helpers/transactionStatus';
import RedisManager from './RedisManager';

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
      status: transactionStatus.OK,
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

  validatePurchaseTime = (date, limitDate) => {
    const transactionTime = moment(date);
    const limitDatePurchase = moment().add(limitDate, 'months');
    if (transactionTime.isBefore(limitDatePurchase)) {
      throw new Error('Error: Time for purchase exceed');
    }
  };

  deleteCardTransactions = async transactionId => {
    const card = await CardModel.findOne({ 'transactions._id': transactionId });
    const transaction = await card.transactions.id(transactionId);
    const getAsync = promisify(RedisManager.get).bind(RedisManager);
    const limitDate = await getAsync('limit_date_purchase');
    const limitDateNumber = -parseInt(limitDate, 10);
    this.validatePurchaseTime(transaction.date, limitDateNumber);
    const { amount } = transaction;
    transaction.status = transactionStatus.DELETED;
    await card.save();
    return { amount, number: card.number };
  };

  updateCardBalance = async (transactionId, amount) => {
    await CardModel.update(
      { number: transactionId },
      { $inc: { balance: amount } },
    );
  };
}

export default new DatabaseManager();
