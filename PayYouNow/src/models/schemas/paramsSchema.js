import mongoose from 'mongoose';

const paramsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  format: { type: String, required: true },
});

export default paramsSchema;
