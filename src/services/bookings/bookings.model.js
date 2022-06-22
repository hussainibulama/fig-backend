const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user_id: { type: String },
    event_id: { type: String },
    user_email: { type: String, sparse: true },
    event_title: { type: String },
    event_location: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Bookings", schema);
