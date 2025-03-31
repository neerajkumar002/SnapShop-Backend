import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    addressInfo: {
      addressId: { type: String, required: true },
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    orderDate: { type: Date, required: true },
    orderUpdateDate: { type: Date, required: true },
    paymentId: { type: String },
    payerId: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
