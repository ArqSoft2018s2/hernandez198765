import mongoose from 'mongoose';
import methodsSchema from './methodsSchema';

const gatewaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, unique: true },
  communicationType: { type: String, required: true },
  url: { type: String, required: true },
  methods: [methodsSchema],
});

export default gatewaySchema;
