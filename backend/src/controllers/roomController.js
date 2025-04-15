const Room = require("../models/Room");

class RoomController {
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      res.status(200).json({ success: true, data: rooms });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getRoomById(req, res) {
    try {
      const room = await Room.findById(req.params.id);
      if (!room)
        return res
          .status(404)
          .json({ success: false, message: "Phòng không tồn tại." });
      res.status(200).json({ success: true, data: room });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getRoomsByHotelId(req, res) {
    try {
      const { hotelId } = req.params;
      const rooms = await Room.find({ hotel: hotelId });
      if (!rooms.length) {
        return res.status(404).json({
          success: false,
          message: "Không có phòng nào cho khách sạn này.",
        });
      }
      res.status(200).json({ success: true, data: rooms });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async createRoom(req, res) {
    try {
      let roomData = req.body;
      roomData.policies = JSON.parse(roomData.policies);
      if (roomData.amenities) {
        roomData.amenities =
          typeof roomData.amenities === "string"
            ? roomData.amenities.split(",").map((a) => a.trim())
            : Array.isArray(amenities)
            ? amenities
            : [];
      }
      const room = new Room(roomData);
      await room.save();
      res.status(201).json({ success: true, data: room });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateRoom(req, res) {
    try {
      let roomData = req.body;
      roomData.policies = JSON.parse(roomData.policies);
      if (roomData.amenities) {
        roomData.amenities =
          typeof roomData.amenities === "string"
            ? roomData.amenities.split(",").map((a) => a.trim())
            : Array.isArray(amenities)
            ? amenities
            : [];
      }
      const room = await Room.findByIdAndUpdate(req.params.id, roomData, {
        new: true,
      });
      if (!room)
        return res
          .status(404)
          .json({ success: false, message: "Phòng không tồn tại." });
      res.status(200).json({ success: true, data: room });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async deleteRoom(req, res) {
    try {
      const room = await Room.findByIdAndDelete(req.params.id);
      if (!room)
        return res
          .status(404)
          .json({ success: false, message: "Phòng không tồn tại." });
      res.status(200).json({ success: true, message: "Xoá phòng thành công." });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new RoomController();
