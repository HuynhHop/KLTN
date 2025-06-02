const Hotel = require("../models/Hotel");

class searchController {
  async searchHotels(req, res) {
    try {
      const {
        minPrice,
        maxPrice,
        starRating,
        amenities,
        province,
        district,
        freeCancellation
      } = req.body;

      const query = { isActive: true, deleted: false };

      if (province) query.province = { $regex: province, $options: "i" };
      if (district) query.district = { $regex: district, $options: "i" };

      if (minPrice || maxPrice) {
        query.pricePerNight = {};
        if (minPrice) query.pricePerNight.$gte = parseInt(minPrice);
        if (maxPrice) query.pricePerNight.$lte = parseInt(maxPrice);
      }

      if (Array.isArray(starRating) && starRating.length > 0) {
        query.starRating = { $in: starRating.map(Number) };
      }

      if (Array.isArray(amenities) && amenities.length > 0) {
        query.amenities = { $all: amenities };
      }

      if (freeCancellation === true) {
        query["policies.cancellationPolicy"] = { $regex: /miễn phí/i };
      }

      const results = await Hotel.find(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new searchController();
