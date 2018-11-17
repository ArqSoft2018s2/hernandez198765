import mongoose from 'mongoose';

const networkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  communicationType: { type: String, required: true },
  url: { type: String, required: true },
});

export default networkSchema;
