import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class TransmitterController {
  communicateWithTransmitter = async (req, res) => {
    console.log('sabelo');
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const transmitterResponse = await HttpService.post(url, req.body.card);
    console.log(transmitterResponse);
    return transmitterResponse;
  };

  deleteTransaction = async (req, res) => {
    const transaction = req.id;
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter/${transaction}`;
    const transmitterResponse = await HttpService.delete(url, req.body.card);
    return transmitterResponse;
  };
}

export default new TransmitterController();
