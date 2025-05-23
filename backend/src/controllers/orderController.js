const Order = require("../models/Order");

class OrderController {
  async getAllOrder(req, res) {
    try {
      const orders = await Order.find().populate("user serviceId");
      res.json({ success: true, data: orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getByUser(req, res) {
    try {
      const { userId } = req.params;
      const orders = await Order.find({ user: userId }).populate("serviceId");
      res.json({ success: true, data: orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const { id } = req.params; // Lấy orderId từ URL
      const order = await Order.findById(id).populate("user serviceId"); // Tìm order theo id và populate các trường liên quan
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      res.json({ success: true, data: order });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async createOrder(req, res) {
    try {
      const {
        user,
        serviceType,
        serviceId,
        hotelName,
        roomName,
        quantity,
        totalPrice,
        contactInfo,
        guestInfo,
        note,
        imageRoom,
      } = req.body;

      const newOrder = new Order({
        user,
        serviceType,
        serviceId,
        hotelName,
        roomName,
        quantity,
        totalPrice,
        contactInfo,
        guestInfo,
        status: "Paid", // Mặc định là trạng thái đặt chỗ
        note: note || "", // Ghi chú của khách hàng
        imageRoom: imageRoom || "", // Hình ảnh phòng đã đặt
      });
      await newOrder.save();

      res.status(201).json({ success: true, data: newOrder });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = [
        "Reserved", // Đã giữ chỗ
        "Pending", // Đang chờ thanh toán
        "Paid", // Đã thanh toán
        "Cancelled", // Đã hủy
        "Refunded", // Đã hoàn tiền
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      res.json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
module.exports = new OrderController();
