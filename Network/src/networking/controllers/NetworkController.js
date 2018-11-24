import dotenv from 'dotenv';
import moment from 'moment';
import { promisify } from 'util';

import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';
import RedisManager from '../../managers/RedisManager';
import HttpService from '../HttpService';

import CreditCards from '../../helpers/CreditCards';
import serializer from '../../helpers/serializer';
import deserializer from '../../helpers/deserializer';

class NetworkController {
  constructor() {
    dotenv.config();
    this.BASE_API = '/Transaction/Transmitter';
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
      const transmitter = this.getTransmitterFromCreditCard(transaction);
      const transmitterResponse = await this.goToTransmitter({
        ...transaction,
        transmitter,
      });
      console.log(transmitterResponse);
      const cardDateTransaction = serializer(number, today);
      const response = await DatabaseManager.sendCardDateTransaction(
        cardDateTransaction,
      );

      return deserializer(response, transmitterResponse, transmitter);
    }
  };

  goToTransmitter = async transaction => {
    const uri = `${this.BASE_API}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.post(uri, transaction);
    return transmitterResponse.data;
  };

  getTransmitterFromCreditCard = transaction => {
    const {
      card: { number },
    } = transaction;
    if (CreditCards.visaRegEx.test(number)) {
      return 'Visa';
    }
    if (CreditCards.mastercardRegEx.test(number)) {
      return 'MasterCard';
    }
    if (CreditCards.discovRegEx.test(number)) {
      return 'Discover';
    }
    if (CreditCards.amexpRegEx.test(number)) {
      return 'Amex';
    }
    throw new Error('Invalid Credit Card');
  };

  returnPurchase = async transactionId => {
    await DatabaseManager.deleteTransaction(transactionId);
  };
}

export default new NetworkController();
