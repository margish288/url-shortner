import mongoose from "mongoose";

const urlModel = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    expires: 60 * 60,
  }
);

export const Url = mongoose.models.Url || mongoose.model("Url", urlModel);
