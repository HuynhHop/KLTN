const HotelComment = require("../models/HotelComment");

class HotelCommentController {
  // Tạo bình luận mới cho hotelId được truyền trong params
  async create(req, res) {
    try {
      const hotelId = req.params.hotelId;
      if (!hotelId) {
        return res.status(400).json({ message: "Thiếu hotelId trong URL" });
      }

      // Tạo comment, gán hotelId từ params
      const comment = new HotelComment({
        hotelId,
        ...req.body,
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo comment", error });
    }
  }

  // Lấy danh sách bình luận theo hotelId, mới nhất trước
  async getByHotel(req, res) {
    try {
      const hotelId = req.params.hotelId;
      if (!hotelId) {
        return res.status(400).json({ message: "Thiếu hotelId trong URL" });
      }

      const comments = await HotelComment.find({ hotelId }).sort({ createdAt: -1 });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy comments", error });
    }
  }

  async delete(req, res) {
    try {
      const commentId = req.params.id;

      if (!commentId) {
        return res.status(400).json({ message: "Thiếu id bình luận trong URL" });
      }

      const comment = await HotelComment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Bình luận không tồn tại" });
      }

      await HotelComment.deleteOne({ _id: commentId });

      res.status(200).json({ message: "Đã xóa bình luận" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa", error });
    }
  }

}

module.exports = new HotelCommentController();
