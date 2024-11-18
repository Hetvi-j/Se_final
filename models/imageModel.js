
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  imageBuffer: { type: Buffer, required: true },
  contentType: { type: String, required: true }
});

const ImageModel = mongoose.model('Image', imageSchema);

export default ImageModel;
