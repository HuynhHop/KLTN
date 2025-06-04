const Voucher = require("../models/Voucher");

class VoucherController {
  async getAll(req, res) {
    try {
      const vouchers = await Voucher.find(); // hoặc có thể giới hạn số lượng
      res.json(vouchers);
    } catch (err) {
      res.status(500).json({ error: "Lỗi server khi lấy danh sách voucher" });
    }
  }

  async createVoucher(req, res) {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.json(voucher);
  }
  async applyVoucher(req, res) {
    const { code, type, id } = req.query;

    try {
      const vouch = await Voucher.findOne({
        code,
        applyTo: type,
        $or: [
          { serviceId: null },       // áp dụng toàn bộ
          { serviceId: id }          // hoặc chỉ áp dụng cho service cụ thể
        ]
      });

      if (!vouch || vouch.expiresAt < new Date()) {
        return res.status(404).json({ error: "Invalid or expired" });
      }

      return res.json(vouch);
    } catch (error) {
      console.error("applyVoucher error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id);

      if (!voucher) {
        return res.status(404).json({ error: "Voucher không tồn tại" });
      }

      res.json(voucher);
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ error: "Lỗi server khi lấy voucher theo ID" });
    }
  }

}
module.exports = new VoucherController();
