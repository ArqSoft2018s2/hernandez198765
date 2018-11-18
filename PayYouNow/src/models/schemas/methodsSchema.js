import mongoose from 'mongoose';
import paramsSchema from './paramsSchema';

const methodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  params: [paramsSchema],
});

export default methodsSchema;
