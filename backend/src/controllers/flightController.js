// const Flight = require("../models/Flight");

// class FlightController {
//   async createFlight(req, res) {
//     const flight = new Flight(req.body);
//     await flight.save();
//     res.json(flight);
//   }
//   async updateFlight(req, res) {
//     const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(flight);
//   }
//   async deleteFlight(req, res) {
//     await Flight.findByIdAndDelete(req.params.id);
//     res.json({ message: "Flight deleted" });
//   }
// }
// module.exports = new FlightController();
const Flight = require("../models/Flight");

class FlightController {
  // Tạo chuyến bay
  async createFlight(req, res) {
    try {
      const flight = new Flight(req.body);
      await flight.save();
      res.status(201).json(flight);
    } catch (err) {
      res.status(500).json({ message: "Lỗi tạo chuyến bay", error: err });
    }
  }

  // Cập nhật chuyến bay
  async updateFlight(req, res) {
    try {
      const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!flight) {
        return res.status(404).json({ message: "Không tìm thấy chuyến bay" });
      }
      res.json(flight);
    } catch (err) {
      res.status(500).json({ message: "Lỗi cập nhật", error: err });
    }
  }

  // Xóa chuyến bay
  async deleteFlight(req, res) {
    try {
      const flight = await Flight.findByIdAndDelete(req.params.id);
      if (!flight) {
        return res.status(404).json({ message: "Không tìm thấy chuyến bay để xóa" });
      }
      res.json({ message: "Đã xóa chuyến bay" });
    } catch (err) {
      res.status(500).json({ message: "Lỗi xóa chuyến bay", error: err });
    }
  }

  // Lấy danh sách chuyến bay (thêm hàm này nếu cần hiển thị frontend)
  async getFlights(req, res) {
    try {
      const flights = await Flight.find({});
      res.json(flights);
    } catch (err) {
      res.status(500).json({ message: "Lỗi lấy danh sách chuyến bay", error: err });
    }
  }

  async getFlightById(req, res) {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        return res.status(404).json({ message: "Không tìm thấy chuyến bay" });
      }
      res.json(flight);
    } catch (err) {
      res.status(500).json({ message: "Lỗi truy vấn chuyến bay", error: err });
    }
  }
}

module.exports = new FlightController();
