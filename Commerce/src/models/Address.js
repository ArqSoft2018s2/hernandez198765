class Address {
  constructor(addressData) {
    this.street = addressData.street;
    this.streetNumber = addressData.streetNumber;
    this.city = addressData.city;
    this.country = addressData.country;
    this.postalCode = addressData.postalCode;
  }
}

module.exports = Address;
