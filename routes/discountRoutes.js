import express from 'express';
import { createCoupon, applyCoupon } from '../controllers/couponController.js';

const router = express.Router();

router.post('/create-coupon', createCoupon);

router.post('/apply', applyCoupon);


export default router;
