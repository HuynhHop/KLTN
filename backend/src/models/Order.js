const mongoose = require("mongoose");
var mongooseDelete = require("mongoose-delete");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceType: {
      type: String,
      enum: ["tour", "hotel", "flight"],
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "serviceType",
    },
    quantity: { type: Number, default: 1 },
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "paid", "cancelled", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Order", orderSchema);
