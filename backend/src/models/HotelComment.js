const mongoose = require("mongoose");

const hotelCommentSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  name: String,
  content: String,
  rating: Number,
  groupType: String,
  roomType: String,
  nights: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HotelComment", hotelCommentSchema);
