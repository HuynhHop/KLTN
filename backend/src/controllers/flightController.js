const Flight = require("../models/Flight");

class FlightController {
  async createFlight(req, res) {
    const flight = new Flight(req.body);
    await flight.save();
    res.json(flight);
  }
  async updateFlight(req, res) {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(flight);
  }
  async deleteFlight(req, res) {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted" });
  }
}
module.exports = new FlightController();
