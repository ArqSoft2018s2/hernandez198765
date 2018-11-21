import mongoose from 'mongoose';
import methodsSchema from './methodsSchema';

const networkSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  communicationType: { type: String, required: true },
  url: { type: String, required: true },
  methods: [methodsSchema],
});

export default networkSchema;
