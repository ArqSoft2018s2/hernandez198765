import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class TransmitterController {
  communicateWithTransmitter = async req => {
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const transmitterResponse = await HttpService.post(url, req.body);
    return transmitterResponse.data;
  };

  deleteTransaction = async (transactionId, amount) => {
    const uri = `${
      apiConstants.TRANSMITTER_API
    }/Transmitter/${transactionId}/${amount}`;
    const transmitterResponse = await HttpService.delete(uri);
    return transmitterResponse.data;
  };
}

export default new TransmitterController();
