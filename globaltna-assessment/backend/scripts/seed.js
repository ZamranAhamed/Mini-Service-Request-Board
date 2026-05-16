import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import JobRequest from "../models/JobRequest.js";

dotenv.config();

const sampleJobs = [
  {
    title: "Fix leaking kitchen sink",
    description:
      "Kitchen sink has a slow leak from the pipe connection under the cabinet. Looking for a plumber to inspect and repair it.",
    category: "Plumbing",
    location: "Colombo 05",
    contactName: "Nimal Perera",
    contactEmail: "nimal.perera@example.com",
    status: "Open",
  },
  {
    title: "Repair faulty bedroom light switch",
    description:
      "The main bedroom light switch sparks occasionally and needs safe replacement by a qualified electrician.",
    category: "Electrical",
    location: "Nugegoda",
    contactName: "Anjali Fernando",
    contactEmail: "anjali.fernando@example.com",
    status: "In Progress",
  },
  {
    title: "Paint living room and hallway",
    description:
      "Need interior painting for a medium-sized living room and hallway. Paint will be provided, but tools are required.",
    category: "Painting",
    location: "Rajagiriya",
    contactName: "Sahan Jayawardena",
    contactEmail: "sahan.jayawardena@example.com",
    status: "Open",
  },
  {
    title: "Build custom pantry shelves",
    description:
      "Looking for a joiner to build and install simple wooden shelves for a small pantry area.",
    category: "Joinery",
    location: "Dehiwala",
    contactName: "Michelle Silva",
    contactEmail: "michelle.silva@example.com",
    status: "Open",
  },
  {
    title: "Deep clean apartment after renovation",
    description:
      "Two-bedroom apartment needs full cleaning after minor renovation work, including windows, floors, and bathrooms.",
    category: "Cleaning",
    location: "Mount Lavinia",
    contactName: "Ravi Kumar",
    contactEmail: "ravi.kumar@example.com",
    status: "Closed",
  },
  {
    title: "Install ceiling fan in dining area",
    description:
      "Need a ceiling fan installed in the dining area. Wiring point is already available.",
    category: "Electrical",
    location: "Kotte",
    contactName: "Tharushi De Silva",
    contactEmail: "tharushi.desilva@example.com",
    status: "Open",
  },
  {
    title: "Replace broken bathroom tap",
    description:
      "Bathroom tap handle is broken and water flow is inconsistent. Replacement tap has already been purchased.",
    category: "Plumbing",
    location: "Maharagama",
    contactName: "Dinesh Wijesinghe",
    contactEmail: "dinesh.wijesinghe@example.com",
    status: "In Progress",
  },
  {
    title: "Repair wooden bedroom door",
    description:
      "Bedroom door does not close properly and may need hinge adjustment or trimming.",
    category: "Joinery",
    location: "Battaramulla",
    contactName: "Kavindi Herath",
    contactEmail: "kavindi.herath@example.com",
    status: "Open",
  },
];

const seedJobs = async () => {
  try {
    await connectDB();
    await JobRequest.deleteMany({});
    const jobs = await JobRequest.insertMany(sampleJobs);

    console.log(`Seeded ${jobs.length} job requests successfully.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedJobs();
