import bycript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import DatabaseManager from '../managers/DatabaseManager';

class AuthenticationController {
  constructor() {
    dotenv.config();
  }

  authenticate = async (username, password) => {
    try {
      const hashedPassword = bycript.hashSync(password, 8);
      const user = await DatabaseManager.getUser(username, hashedPassword);
      if (!user) {
        throw new Error('Authentication Fail');
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: parseInt(process.env.EXPIRATION_TIME, 10),
      });
      return { auth: true, token };
    } catch (error) {
      throw new Error('Authentication Fail');
    }
  };

  register = async (username, password) => {
    try {
      const hashedPassword = bycript.hashSync(password, 8);
      await DatabaseManager.saveUser(username, hashedPassword);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  validate = async token => {
    try {
      const decodedToken = await jwt.verify(token);
      const user = await DatabaseManager.getUserById(decodedToken.id);
      if (!user) {
        throw new Error('Operation forbidden permission denied');
      }
    } catch (error) {
      throw new Error('Validation fail');
    }
  };
}

export default new AuthenticationController();
