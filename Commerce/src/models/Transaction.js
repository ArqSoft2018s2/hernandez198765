const moment = require('moment');
const Card = require('./Card');
const Address = require('./Address');
const Product = require('./Product');

class Transaction {
  constructor(transactionData) {
    // this.card = new Card(transactionData.card);
    // this.shippingAddress = new Address(transactionData.shippingAddress);
    // this.billingAddress = new Address(transactionData.billingAddress);
    // this.amount = transactionData.amount;
    // this.date = moment().unix();
    // this.product = new Product(transactionData.product);
  }
}

module.exports = Transaction;
