const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    password: { type: String },
    email: { type: String, sparse: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", schema);
