const serializer = (gateway, network, transmitter) => ({
  gatewayId: gateway.id,
  networkId: network.id,
  transmitterId: transmitter.number,
  transmitterTransactionId: transmitter.id,
});

export default serializer;
