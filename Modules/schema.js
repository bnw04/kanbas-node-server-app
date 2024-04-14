import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    course: String
  },
  { collection: "modules" });

export default moduleSchema;