import mongoose from "mongoose";
import colors from "colors";
//import cloudinary from 'cloudinary';

const connectDB = async () => {
  try {
    const constring = "mongodb+srv://viprathakkar27:VIPRA1234@cluster0.xugbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const conn = await mongoose.connect(constring);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

// Configure Cloudinary
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
//   api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
// });

export default connectDB;
