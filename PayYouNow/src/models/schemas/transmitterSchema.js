import mongoose from 'mongoose';

const transmitterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  communicationType: { type: String, required: true },
  url: { type: String, required: true },
});

export default transmitterSchema;
