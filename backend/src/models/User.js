const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user: { type: String, required: true, trim: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
