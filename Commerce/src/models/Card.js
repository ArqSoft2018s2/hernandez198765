class Card {
  constructor(cardData) {
    this.number = cardData.number;
    this.expirationDate = cardData.expirationDate;
    this.holderName = cardData.holderName;
    this.securityCode = cardData.securityCode;
  }
}

module.exports = Card;
