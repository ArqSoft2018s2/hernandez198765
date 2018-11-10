import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class TransmitterController {
  communicateWithTransmitter = async req => {
    const uri = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const transmitterResponse = await HttpService.post(uri, req.body);
    return transmitterResponse.data;
  };

  deleteTransaction = async transactionId => {
    const uri = `${apiConstants.TRANSMITTER_API}/Transmitter/${transactionId}`;
    const transmitterResponse = await HttpService.delete(uri);
    return transmitterResponse.data;
  };

  chargeback = async transactionToChargeback => {
    const uri = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const transmitterResponse = await HttpService.put(
      uri,
      transactionToChargeback,
    );
    return transmitterResponse.data;
  };
}

export default new TransmitterController();
