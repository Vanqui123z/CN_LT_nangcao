const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
}, { collection: "eventData", timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
