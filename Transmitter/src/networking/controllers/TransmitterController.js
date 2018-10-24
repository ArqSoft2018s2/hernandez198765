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

  validateCard = async card => {
    try {
      const response = await DatabaseManager.validateCardIsEmitted(card);
      return response;
    } catch (error) {
      console.log('ACA');
      throw new Error(error);
    }
  };

  luhn = value => {
    let valueToWork = value;
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(valueToWork)) return false;
    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    valueToWork = valueToWork.replace(/\D/g, '');

    for (let n = valueToWork.length - 1; n >= 0; n - 1) {
      let cDigit = valueToWork.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  };
}

export default new TransmitterController();
