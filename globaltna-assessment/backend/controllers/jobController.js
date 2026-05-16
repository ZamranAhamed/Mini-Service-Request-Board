import JobRequest from "../models/JobRequest.js";

const allowedStatuses = ["Open", "In Progress", "Closed"];
const requiredJobFields = [
  "title",
  "description",
  "category",
  "location",
  "contactName",
  "contactEmail",
];

const createHttpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getJobs = async (req, res, next) => {
  try {
    const filter = {};
    const { category, status, search } = req.query;

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search?.trim()) {
      const searchRegex = { $regex: escapeRegex(search.trim()), $options: "i" };

      filter.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return next(createHttpError(404, "Job request not found"));
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const missingFields = requiredJobFields.filter(
      (field) => !req.body[field]?.trim()
    );

    if (missingFields.length > 0) {
      return next(createHttpError(400, "All fields are required"));
    }

    const job = await JobRequest.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJobStatus = async (req, res, next) => {
  try {
    const fields = Object.keys(req.body);

    if (fields.length !== 1 || fields[0] !== "status") {
      return next(createHttpError(400, "Only status can be updated"));
    }

    if (!allowedStatuses.includes(req.body.status)) {
      return next(createHttpError(400, "Invalid status value"));
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return next(createHttpError(404, "Job request not found"));
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return next(createHttpError(404, "Job request not found"));
    }

    res.status(200).json({ message: "Job request deleted successfully" });
  } catch (error) {
    next(error);
  }
};
