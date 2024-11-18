import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
  productReviewController,
  getProductReviewsController,
  findSimilarImage
  


} from "../controllers/productController.js";
import formidable from "express-formidable";
import {requireSignIn,isAdmin} from '../middlewares/authMiddelware.js'


const router = express.Router();
import multer from 'multer';
import path from 'path'; 
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, 
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; 
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: File type not supported'));
  }
});

router.post('/find-similar', upload.single('photo'), findSimilarImage);

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


router.get("/get-product", getProductController);


router.get("/get-product/:slug", getSingleProductController);


router.get("/product-photo/:pid", productPhotoController);


router.delete("/delete-product/:pid", deleteProductController);


router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);


router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug", productCategoryController);

router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


router.put("/:id/review", requireSignIn, productReviewController);

router.get("/:id/getreviews",getProductReviewsController);


export default router;