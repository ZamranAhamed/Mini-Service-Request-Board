import mongoose from "mongoose";
import validator from "validator";

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      validate: {
        validator: (email) => !email || validator.isEmail(email),
        message: "Please provide a valid email address",
      },
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
    collection: "jobRequests",
  }
);

const JobRequest = mongoose.model("JobRequest", jobRequestSchema);

export default JobRequest;
