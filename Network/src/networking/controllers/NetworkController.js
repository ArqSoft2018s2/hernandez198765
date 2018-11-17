import dotenv from 'dotenv';
import moment from 'moment';
import { promisify } from 'util';
import DatabaseManager from '../../managers/DatabaseManager';
import serializer from '../../helpers/serializer';
import deserializer from '../../helpers/deserializer';
import LoggerController from './LoggerController';
import RedisManager from '../../managers/RedisManager';

class NetworkController {
  constructor() {
    dotenv.config();
    this.BASE_API = '/Network';
  }

  fraudControl = async transaction => {
    LoggerController.registerLog('Start Fraud Control');
    const {
      card: { number },
    } = transaction;
    const today = moment().unix();
    const threeDaysAgo = moment()
      .add(-3, 'days')
      .unix();

    const quantity = await DatabaseManager.getQuantityOfTransactionsBetweenHours(
      number,
      today,
      threeDaysAgo,
    );

    const getAsync = promisify(RedisManager.get).bind(RedisManager);
    const fraudLimit = await getAsync('fraud_limit');
    if (quantity + 1 > parseInt(fraudLimit, 10)) {
      throw new Error('Error: fradulent transaction');
    } else {
      const cardDateTransaction = serializer(number, today);
      const response = await DatabaseManager.sendCardDateTransaction(
        cardDateTransaction,
      );
      return deserializer(response);
    }
  };

  returnPurchase = async transactionId => {
    await DatabaseManager.deleteTransaction(transactionId);
  };
}

export default new NetworkController();
