import mongoose from 'mongoose';

const GatewaySchema = new mongoose.Schema({
  name: { type: Number, required: true },
  category: { type: Number, required: true },
});

export default GatewaySchema;
