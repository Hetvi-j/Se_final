import Coupon from '../models/coupenModel.js';

export const createCoupon = async (req, res) => {
    try {
      const couponData = req.body;
      const newCoupon = new Coupon(couponData);
      await newCoupon.save();
  
      
      res.status(201).json({
        success: true,
        message: 'Coupon created successfully',
        data: newCoupon,
      });
    } catch (err) {
      console.error(err); 
      res.status(500).json({
        success: false,
        message: 'Failed to create coupon',
        error: err.message,
      });
    }
  };
  

export const updateCoupon = async (req, res) => {
  const { id } = req.params; 

  if (!id) {
    return res.status(400).json({ success: false, message: 'Coupon ID is missing' });
  }

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    res.status(200).json({ success: true, coupon: updatedCoupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update coupon' });
  }
};

export const deleteCoupon = async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.status(204).send(); 
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete coupon' });
    }
  };
  

export const getCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find(); 
      res.status(200).json({ success: true, coupons }); 
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
    }
  };
  
 
  export const getLatestCoupon = async (req, res) => {
    try {
      const coupon = await Coupon.findOne().sort({ createdAt: -1 }).select('_id'); 
      if (coupon) {
        res.status(200).json({ success: true, coupon });
      } else {
        res.status(404).json({ success: false, message: 'Coupon not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch coupon' });
    }
  };
  
export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code });


    if (!coupon) return res.status(404).json({ error: 'Coupon not found' });

    if (coupon.status !== 'active') return res.status(400).json({ error: 'Coupon is inactive' });

    if (new Date() > coupon.expiration_date) return res.status(400).json({ error: 'Coupon expired' });

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    coupon.used_count += 1;

    await coupon.save();

    res.json({ 
      success: true, 
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply coupon' });
  }
};
