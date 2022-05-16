const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    customer_id: String,
    amount: { type: Number, default: 0 },
    status: { type: String},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Bill", schema);
