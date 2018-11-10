const serializer = (gateway, network, transmitter) => ({
  gatewayId: gateway.id,
  networkId: network.id,
  transmitterId: transmitter.id,
});

export default serializer;
