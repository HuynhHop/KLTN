const slugify = require("slugify");
const Hotel = require("../models/Hotel");

class HotelController {
  async createHotel(req, res) {
    try {
      const {
        name,
        address,
        province,
        district,
        description,
        amenities,
        pricePerNight,
        location,
        starRating,
        checkInTime,
        checkOutTime,
        policies,
        contact,
      } = req.body;

      if (!name || !address || !pricePerNight || !req.files?.length) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Chuyển chuỗi tiện nghi thành mảng nếu cần
      const amenitiesArray =
        typeof amenities === "string"
          ? amenities.split(",").map((item) => item.trim())
          : Array.isArray(amenities)
          ? amenities
          : [];

      // Lấy URL ảnh từ Cloudinary đã upload sẵn
      const imageUrls = req.files.map((file) => file.path);

      // Parse location nếu là JSON string
      const parsedLocation =
        typeof location === "string" ? JSON.parse(location) : location;

      const newHotel = new Hotel({
        name,
        slug: slugify(name, { lower: true, strict: true }),
        address,
        province,
        district,
        description,
        amenities: amenitiesArray,
        pricePerNight,
        location: parsedLocation,
        starRating: starRating ? Number(starRating) : undefined,
        checkInTime,
        checkOutTime,
        policies: policies ? JSON.parse(policies) : undefined,
        contact: contact ? JSON.parse(contact) : undefined,
        images: imageUrls,
      });

      await newHotel.save();

      res.status(201).json({ success: true, data: newHotel });
    } catch (err) {
      console.error("Error creating hotel:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getAllHotel(req, res) {
    try {
      const hotels = await Hotel.find();
      res.json(hotels);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getHotelById(req, res) {
    try {
      const hotel = await Hotel.findById(req.params.id);
      if (!hotel) return res.status(404).json({ message: "Hotel not found" });
      res.json(hotel);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getHotelsByProvince(req, res) {
    try {
      const { province } = req.params;
      const hotels = await Hotel.find({ province: new RegExp(province, "i") }); // Tìm không phân biệt hoa thường
      res.status(200).json({ success: true, data: hotels });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getHotelsByDistrict(req, res) {
    try {
      const { district } = req.params;
      const hotels = await Hotel.find({ district: new RegExp(district, "i") });
      res.status(200).json({ success: true, data: hotels });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateHotel(req, res) {
    try {
      const { id } = req.params;

      const {
        name,
        address,
        province,
        district,
        description,
        amenities,
        pricePerNight,
        location,
        starRating,
        checkInTime,
        checkOutTime,
        policies,
        contact,
      } = req.body;

      const updateData = {
        ...(name && {
          name,
          slug: slugify(name, { lower: true, strict: true }),
        }),
        ...(address && { address }),
        ...(province && { province }),
        ...(district && { district }),
        ...(description && { description }),
        ...(pricePerNight && { pricePerNight }),
        ...(starRating && { starRating }),
        ...(checkInTime && { checkInTime }),
        ...(checkOutTime && { checkOutTime }),
        ...(policies && { policies: JSON.parse(policies) }),
        ...(contact && { contact: JSON.parse(contact) }),
      };

      if (location) {
        updateData.location =
          typeof location === "string" ? JSON.parse(location) : location;
      }

      if (amenities) {
        updateData.amenities =
          typeof amenities === "string"
            ? amenities.split(",").map((a) => a.trim())
            : Array.isArray(amenities)
            ? amenities
            : [];
      }

      if (req.files?.length) {
        updateData.images = req.files.map((file) => file.path);
      }

      const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedHotel) {
        return res
          .status(404)
          .json({ success: false, message: "Hotel not found" });
      }

      res.status(200).json({ success: true, data: updatedHotel });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteHotel(req, res) {
    try {
      const { id } = req.params;
      const deletedHotel = await Hotel.findByIdAndDelete(id);

      if (!deletedHotel) {
        return res
          .status(404)
          .json({ success: false, message: "Hotel not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Hotel deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new HotelController();
