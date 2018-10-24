const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  card: {
    number: Number,
    expirationDate: String,
    holderName: String,
    securityCode: String,
    balance: Number,
  },
});

export default mongoose.model('Transaction', CardSchema);
