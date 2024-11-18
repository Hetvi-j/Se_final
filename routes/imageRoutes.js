import express from 'express';
import multer from 'multer';
import { uploadImage, findSimilarImages } from '../controllers/imageController.js'; // Adjust the path as necessary

const router = express.Router();

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), uploadImage);

router.post('/find-similar', findSimilarImages);

export default router;
