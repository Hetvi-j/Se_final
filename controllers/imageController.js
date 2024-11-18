import cloudinary from '../config/db.js'; 
import Product from '../models/productModel.js'; 

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      transformation: [{ quality: 'auto', fetch_format: 'auto' }], 
    });

   
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
      photo: result.secure_url, 
      shipping: req.body.shipping,
    });

    
    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully!',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};


export const findSimilarImages = async (req, res) => {
  try {
    const { photoPhash } = req.body; 
    const similarProducts = await Product.find({ photoPhash }); 

    if (similarProducts.length > 0) {
      res.status(200).json({ similarProducts });
    } else {
      res.status(404).json({ message: 'No similar images found.' });
    }
  } catch (error) {
    console.error('Error finding similar images:', error);
    res.status(500).json({ error: 'Error finding similar images' });
  }
};
