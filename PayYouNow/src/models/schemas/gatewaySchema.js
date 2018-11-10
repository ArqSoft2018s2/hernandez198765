import mongoose from 'mongoose';

const gatewaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
});

export default gatewaySchema;
