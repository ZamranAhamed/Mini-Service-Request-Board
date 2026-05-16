import express from "express";
import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJobStatus,
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/").get(getJobs).post(createJob);
router.route("/:id/status").patch(updateJobStatus);
router.route("/:id").get(getJobById).patch(updateJobStatus).delete(deleteJob);

export default router;
