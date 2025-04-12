const Voucher = require("../models/Voucher");

class VoucherController {
  async createVoucher(req, res) {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.json(voucher);
  }
  async applyVoucher(req, res) {
    const { code, type, id } = req.query;
    const vouch = await Voucher.findOne({ code, applyTo: type, serviceId: id });
    if (!vouch || vouch.expiresAt < new Date())
      return res.status(404).json({ error: "Invalid or expired" });
    res.json(vouch);
  }
}
module.exports = new VoucherController();
