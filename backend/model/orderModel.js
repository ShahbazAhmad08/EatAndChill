import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  items: { type: Array, require: true },
  amount: { type: Number, require: true },
  address: { type: Object, require: true },
  status: { type: String, default: "Food processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180,
  },
});

const orderModel = mongoose.model.order || mongoose.model("order", orderSchema);
export default orderModel;
