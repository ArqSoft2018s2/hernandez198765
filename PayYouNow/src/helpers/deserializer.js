import transactionStatus from './transactionStatus';

class Deserializer {
  deserializerDb = transaction => ({
    id: transaction.id,
  });

  deserializeResponse = transaction => ({
    RUT: transaction.RUT,
    gateway: {
      idGateway: transaction.gateway,
      idTransaction: transaction.gatewayId,
    },
    network: {
      idNetwork: transaction.network,
      idTransaction: transaction.networkId,
    },
    transmitter: {
      idTransmitter: transaction.transmitter,
      idTransaction: transaction.transmitterId,
    },
    status: transactionStatus.OK,
  });
}

export default new Deserializer();
