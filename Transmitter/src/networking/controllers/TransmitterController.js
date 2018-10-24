import DatabaseManager from '../../managers/DatabaseManager';

class TransmitterController {
  constructor() {
    this.BASE_API = '/Transmitter';
  }

  addNewCard = async newCard => {
    try {
      await DatabaseManager.addNewCard(newCard);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new TransmitterController();
