const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    phone_number: { type: String, sparse: true },
    wallet: { type: Number, default: 0 },
    username: { type: String, sparse: true, default: "" },
    password: String,
    email: { type: String, sparse: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", schema);
