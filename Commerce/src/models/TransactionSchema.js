const mongoose = require('mongoose');
const Transaction = require('./Transaction');

const TransactionSchema = new mongoose.Schema({
  card: {
    number: Number,
    expirationDate: String,
    holderName: String,
    securityCode: String,
  },
  shippingAddress: {
    street: String,
    streetNumber: Number,
    city: String,
    country: String,
    postalCode: String,
  },
  billingAddress: {
    street: String,
    streetNumber: Number,
    city: String,
    country: String,
    postalCode: String,
  },
  amount: Number,
  date: Number,
  product: {
    amount: String,
    name: String,
    category: String,
    gateway: String,
  },
});
TransactionSchema.loadClass(Transaction);

module.exports = mongoose.model('Transaction', TransactionSchema);
