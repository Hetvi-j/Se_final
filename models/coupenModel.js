import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount_type: { type: String, enum: ['percentage', 'fixed'], required: true },
  discount_value: { type: Number, required: true },
  expiration_date: { type: Date, required: true },
  min_order_value: { type: Number, default: 0 },
  usage_limit: { type: Number, default: 1 },
  used_count: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;

