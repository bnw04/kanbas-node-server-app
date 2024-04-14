import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    number: { type: String, required: true },
    name: { type: String, required: true },
    credit: Number,
    department: String,
    startDate: Date,
    endDate: Date,
    description: String,
    image: String,
    sec: String,
    semester: String,
  },
  { collection: "courses" });

export default courseSchema;