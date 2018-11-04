const serializer = (gateway, network, transmitter) => ({
  gatewayId: gateway.id,
  networkId: network.id,
  transmitterId: transmitter.number,
  amount: transmitter.amount,
});

export default serializer;
