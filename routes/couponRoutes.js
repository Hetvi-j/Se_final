import express from 'express';
import { createCoupon, updateCoupon, deleteCoupon, applyCoupon ,getCoupons,getLatestCoupon} from '../controllers/couponController.js';
import {requireSignIn,isAdmin} from '../middlewares/authMiddelware.js'

const router = express.Router();



router.post('/', requireSignIn,isAdmin, createCoupon);          
router.put('/:id',requireSignIn, isAdmin, updateCoupon);      
router.delete('/:id', requireSignIn,isAdmin, deleteCoupon);     


router.get('/apply/:code',requireSignIn, applyCoupon);          


router.get('/',requireSignIn,isAdmin, getCoupons); 

router.get('/:id', requireSignIn,isAdmin,getLatestCoupon);

export default router;
