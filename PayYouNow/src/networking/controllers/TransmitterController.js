import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';
import DatabaseManager from '../../managers/DatabaseManager';

class TransmitterController {
  communicateWithTransmitter = async req => {
    const uri = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.post(uri, req.body);
    return transmitterResponse.data;
  };

  deleteTransaction = async transactionId => {
    const uri = `${apiConstants.TRANSMITTER_API}/Transmitter/${transactionId}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.delete(uri);
    return transmitterResponse.data;
  };

  chargeback = async transactionToChargeback => {
    const uri = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.put(
      uri,
      transactionToChargeback,
    );
    return transmitterResponse.data;
  };

  obtainTransmitter = async transmitterName => {
    if (!transmitterName) {
      throw new Error('No transmitter specified');
    }
    const transmitter = await DatabaseManager.getTransmitterByName(
      transmitterName,
    );
    return transmitter.url;
  };
}

export default new TransmitterController();
