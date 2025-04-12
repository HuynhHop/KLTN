const Order = require("../models/Order");

class OrderController {
  async getAllOrder(req, res) {
    const orders = await Order.find().populate("user serviceId");
    res.json(orders);
  }
  async getByUser(req, res) {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("serviceId");
    res.json(orders);
  }
  async updateStatusOrder(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  }
}
module.exports = new OrderController();
