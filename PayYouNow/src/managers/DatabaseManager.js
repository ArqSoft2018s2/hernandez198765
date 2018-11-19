import mongoose from 'mongoose';
import TransactionModel from '../models/transactionModel';
import GatewayModel from '../models/gatewayModel';
import TransmitterModel from '../models/transmitterModel';
import NetworkModel from '../models/networkModel';
import Serializer from '../helpers/serializer';
import deserializer from '../helpers/deserializer';

class DatabaseManager {
  constructor() {
    this.DB_CONNECTION = 'localhost:27017/payYouNow_db';
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        'mongodb://localhost:27017/payYouNow_db',
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  getGateways = async () => {
    const response = await GatewayModel.find();
    return response;
  };

  saveTransaction = async (gateway, network, transmitter) => {
    const parsedTransaction = Serializer.serializeTransaction(
      gateway,
      network,
      transmitter,
    );
    const newTransaction = new TransactionModel(parsedTransaction);
    const response = await newTransaction.save();
    return deserializer(response);
  };

  getTransactionFromDatabase = async transactionId => {
    const response = await TransactionModel.findById(transactionId).lean();
    if (!response) {
      throw new Error('Transaction doesnt exists');
    }
    return response;
  };

  deleteTransaction = async transactionId => {
    await TransactionModel.findByIdAndRemove(transactionId);
  };

  getGatewayByName = async name => {
    const gateway = GatewayModel.findOne({ name }).lean();
    return gateway;
  };

  saveGateway = async gateway => {
    const newGateway = new GatewayModel(gateway);
    await newGateway.save();
  };

  getTransmitterByName = async name => {
    const transmitter = TransmitterModel.findOne({ name }).lean();
    return transmitter;
  };

  saveTransmitter = async transmitter => {
    const newTransmitter = new TransmitterModel(transmitter);
    await newTransmitter.save();
  };

  getNetworkyByName = async name => {
    const network = NetworkModel.findOne({ name }).lean();
    return network;
  };

  saveNetwork = async network => {
    const newNetwork = new NetworkModel(network);
    await newNetwork.save();
  };
}

export default new DatabaseManager();
