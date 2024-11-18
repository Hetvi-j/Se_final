
import { imageHash } from 'image-hash';

import mongoose from "mongoose";

import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import natural from 'natural';
import compromise from 'compromise';
import { Console } from "console";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    console.log("Request received to get product photo");
    
    console.log("Request Parameters:", req.params);

    const { pid } = req.params; 
    if (!pid) {
      return res.status(400).send({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await productModel.findById(pid).select("photo");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "No photo available for this product",
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID format",
      });
    }
    console.log("Error while fetching photo:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

    
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || keyword.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Keyword is required',
      });
    }


    const processedKeyword = keyword.trim();

    const doc = compromise(processedKeyword);
    const filteredTerms = doc
      .not("#Determiner") 
      .not("#Pronoun")    
      .not("#Conjunction") 
      .not("#Preposition") 
      .not("Want")
      .not("give")
      .terms()
      .out('array');


    console.log("Filtered Keywords:", filteredTerms);

    if (filteredTerms.length === 0) {
      return res.json({
        success: true,
        suggestions: [], 
        keyword: processedKeyword,
      });
    }

   
    const regexArray = filteredTerms.map(term => ({
      $or: [
        { name: { $regex: term, $options: 'i' } },        
        { description: { $regex: term, $options: 'i' } }, 
      ]
    }));

  
    const results = await productModel
      .find({
        $and: regexArray, 
      })
      .select('name description price _id slug') 
      .limit(10);

   
    console.log("Search Results:", results);

   
    res.json({
      success: true,
      suggestions: results.map(product => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        slug: product.slug,
      })),
      keyword: processedKeyword,
    });
  } catch (error) {
    console.error("Error in Search Product API:", error);
    res.status(400).send({
      success: false,
      message: 'Error In Search Product API',
      error: error.message || error,
    });
  }
};

export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const productReviewController = async (req, res) => {
  try {
    const { comment, rating: rawRating } = req.body;

    
    const rating = rawRating || req.body.RATING || req.body.Rating;

    console.log("Product ID from request:", req.params.id); 

   
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "You must be logged in to leave a review",
      });
    }

  
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid rating between 1 and 5.",
      });
    }

    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (!Array.isArray(product.reviews)) {
      product.reviews = []; 
    }

 
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Product already reviewed.",
      });
    }

   
    const review = {
      name: req.user.name,
      rating: Number(rating), 
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);


    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(200).send({
      success: true,
      message: "Review added!",
    });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error in adding review",
      error,
    });
  }
};



export const getProductReviewsController = async (req, res) => {
  try {
    const productId = req.params.id; 
    console.log("Fetching reviews for product ID:", productId); 


    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (!Array.isArray(product.reviews) || product.reviews.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No reviews found for this product",
      });
    }

    res.status(200).send({
      success: true,
      message: "Reviews fetched successfully",
      reviews: product.reviews, 
    });
  } catch (error) {
    console.log("Error fetching product reviews:", error);

    if (error.name === "CastError") {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    res.status(500).send({
      success: false,
      message: "Error in fetching reviews",
      error,
    });
  }
};


const generateImageHash = (buffer, hashType = 'phash') => {
  return new Promise((resolve, reject) => {
    imageHash({ data: buffer }, 8, { method: hashType }, (error, hash) => {
      if (error) reject(error);
      resolve(hash);
    });
  });
};

const compareHashes = (hash1, hash2) => {
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) distance++;
  }
  return distance;
};


export const findSimilarImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    
    const uploadedImageHash = await generateImageHash(req.file.buffer, 'phash');

    const products = await productModel.find().select('photo');
    console.log(`Total products found: ${products.length}`);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    let similarProduct = null;
    let minDistance = Infinity;
    const similarityThreshold = 10; 

    for (const product of products) {
      if (!product.photo || !product.photo.data) continue;

      const existingImageHash = await generateImageHash(product.photo.data, 'phash');

      const distance = compareHashes(uploadedImageHash, existingImageHash);
      
      console.log(`Distance between uploaded image and product ${product._id}: ${distance}`);

      if (distance < minDistance) {
        minDistance = distance;
        if (distance <= similarityThreshold) {
          similarProduct = product;
        }
      }
    }

    if (similarProduct) {
      res.status(200).json({
        message: 'Similar product found',
        product: similarProduct,
        similarityScore: minDistance,
      });
    } else {
      res.status(404).json({ message: 'No similar product found' });
    }
  } catch (error) {
    console.error('Error finding similar image:', error);
    res.status(500).json({ message: `Error finding similar image: ${error.message} `});
  }
};
