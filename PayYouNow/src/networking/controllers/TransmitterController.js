import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class TransmitterController {
  communicateWithTransmitter = async req => {
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const transmitterResponse = await HttpService.post(url, req.body.card);
    return transmitterResponse.data;
  };

  deleteTransaction = async (transactionId, amount) => {
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const body = { transactionId, amount };
    const transmitterResponse = await HttpService.delete(url, body);
    return transmitterResponse.data;
  };
}

export default new TransmitterController();
