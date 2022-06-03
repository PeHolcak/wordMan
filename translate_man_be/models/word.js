import mongoose from "mongoose";
const wordSchema = mongoose.Schema(
  {
    firstSideWord: {
      type: String,
      required: true
    },
    secondSideWord: {
      type: String,
      required: false,
    },
    firstSideWordDescription: {
      type: String,
      required: true
    },
    secondSideWordDescription: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
const word = mongoose.model("word", wordSchema);
export default word;
