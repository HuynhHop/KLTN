// const mongoose = require("mongoose");
// var mongooseDelete = require("mongoose-delete");

// const roomSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     people: { type: Number },
//     maxPeople: { type: Number },
//     standardPeople: { type: Number },
//     area: { type: String },
//     view: { type: String },
//     beds: { type: String },

//     price: { type: Number },
//     servicePrice: { type: Number },
//     // discountedPrice: { type: Number },
//     // finalPrice: { type: Number },
//     cashback: { type: Number },
//     // coupon: { type: String },

//     childrenPolicy: { type: String },
//     recentBookedHoursAgo: { type: Number },

//     images: [{ type: String }],
//     amenities: [{ type: String }],

//     policies: {
//       cancellation: { type: String },
//       breakfast: { type: String },
//       confirmation: { type: String },
//       invoice: { type: String },
//       extra: { type: String },
//     },
//     hotel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Hotel",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// roomSchema.plugin(mongooseDelete, {
//   deletedAt: true,
//   overrideMethods: "all",
// });

// module.exports = mongoose.model("Room", roomSchema);

const mongoose = require("mongoose");
var mongooseDelete = require("mongoose-delete");

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    people: Number,
    maxPeople: Number,
    standardPeople: Number,
    area: String,
    view: String,
    beds: String,
    price: Number, // Giá gốc
    serviceFee: { type: Number, default: 0 }, // Thêm phí dịch vụ
    cashback: Number,
    childrenPolicy: String,
    recentBookedHoursAgo: Number,
    images: [String],
    amenities: [String],
    policies: {
      cancellation: String,
      breakfast: String,
      confirmation: String,
      invoice: String,
      extra: String,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

roomSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Room", roomSchema);
