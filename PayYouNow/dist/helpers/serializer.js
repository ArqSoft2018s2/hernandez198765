"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var serializer = function serializer(gateway, network, transmitter) {
  return {
    gatewayId: gateway.id,
    networkId: network.id,
    transmitterId: transmitter.number,
    transmitterTransactionId: transmitter.id
  };
};

var _default = serializer;
exports.default = _default;