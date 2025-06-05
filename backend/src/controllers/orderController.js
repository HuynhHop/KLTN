const Order = require("../models/Order");
const Room = require("../models/Room");

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

      if (serviceType === "Hotel") {
        const room = await Room.findById(serviceId);
        if (!room) {
          return res.status(404).json({ 
            success: false, 
            message: "Không tìm thấy phòng" 
          });
        }

        if (room.quantity < quantity) {
          return res.status(400).json({ 
            success: false, 
            message: "Số lượng phòng không đủ" 
          });
        }

        // Giảm số lượng phòng
        room.quantity -= quantity;
        await room.save();
      }

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

  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({ 
          success: false, 
          message: "Không tìm thấy đơn hàng" 
        });
      }

      // Nếu là đơn phòng khách sạn và đã thanh toán, hoàn trả số lượng phòng
      if (order.serviceType === "Hotel" && order.status === "Paid") {
        const room = await Room.findById(order.serviceId);
        if (room) {
          room.quantity += order.quantity;
          await room.save();
        }
      }

      // Xóa đơn hàng
      await Order.findByIdAndDelete(id);

      res.json({ 
        success: true, 
        message: "Xóa đơn hàng thành công" 
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
  
}
module.exports = new OrderController();
