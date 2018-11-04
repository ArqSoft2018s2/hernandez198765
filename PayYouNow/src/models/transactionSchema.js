const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  idGateway: String,
  idNetwork: String,
  idTransmitter: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
