const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    categrory: { type: String },
    date: { type: Date },
    isVirtual: { type: Boolean },
    address: { type: String },
    time: { type: String },
    file: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Events", schema);
