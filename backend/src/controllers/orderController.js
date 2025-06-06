const Order = require("../models/Order");
const Room = require("../models/Room");
const Cash = require("../models/Cash");

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
        cashUsed = 0 // Thêm trường cashUsed, mặc định là 0
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

      // Trừ tiền từ ví Cash nếu có sử dụng
      if (cashUsed > 0) {
        const cash = await Cash.findOne({ user });
        if (!cash || cash.money < cashUsed) {
          return res.status(400).json({
            success: false,
            message: "Số dư ví Cash không đủ"
          });
        }
        
        cash.money -= cashUsed;
        await cash.save();
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
        status: "Paid",
        note: note || "",
        imageRoom: imageRoom || "",
        cashUsed // Lưu số tiền đã sử dụng từ Cash vào order
      });
      await newOrder.save();

      // Xử lý cashback (phần này giữ nguyên nhưng thêm kiểm tra cashUsed)
      if (serviceType === "Hotel" && (!cashUsed || cashUsed < totalPrice)) {
        const room = await Room.findById(serviceId);
        if (room && room.cashback) {
          const cashbackValue = room.cashback * quantity;

          // Tìm hoặc tạo cash
          const cash = await Cash.findOne({ user });
          if (cash) {
            // Tính toán cashback dựa trên level
            let actualCashback = cashbackValue;
            switch (cash.level) {
              case "silver":
                actualCashback *= 1.1;
                break;
              case "gold":
                actualCashback *= 1.2;
                break;
              case "diamond":
                actualCashback *= 1.5;
                break;
            }

            cash.money += Math.round(actualCashback);
            cash.totalSpent += quantity;
            cash.updateLevel();
            await cash.save();
          } else {
            const newCash = new Cash({
              user,
              money: Math.round(cashbackValue),
              totalSpent: quantity
            });
            newCash.updateLevel();
            await newCash.save();
          }
        }
      }

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
