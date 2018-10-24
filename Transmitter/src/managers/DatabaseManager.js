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

  addNewCard = newCard => {
    const newTransaction = new CardSchema(newCard);

    newTransaction.save((error, databaseResponse) => {
      if (error) {
        throw new Error('Error in the database');
      }
    });
  };
}

export default new DatabaseManager();
