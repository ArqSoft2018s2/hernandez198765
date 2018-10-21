const creditCards = {
  visaRegEx: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
  mastercardRegEx: /^(?:5[1-5][0-9]{14})$/,
  amexpRegEx: /^(?:3[47][0-9]{13})$/,
  discovRegEx: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/,
};

export default creditCards;
