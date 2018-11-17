import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../models/userModel';

class DatabaseManager {
  constructor() {
    dotenv.config();
    this.DB_CONNECTION = process.env.DATABASE_IP;
    mongoose.Promise = global.Promise;
  }

  connect = async () => {
    try {
      await mongoose.connect(
        `mongodb://${this.DB_CONNECTION}`,
        { useNewUrlParser: true },
      );
    } catch (error) {
      console.log('Cannot connect with Database');
    }
  };

  saveUser = async (username, password) => {
    const newUser = new UserModel({ username, password });
    await newUser.save();
  };

  getUser = async (username, password) => {
    const user = await UserModel.findOne({ username, password });
    return user;
  };
}

export default new DatabaseManager();
