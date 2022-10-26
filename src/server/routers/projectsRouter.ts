import express from "express";
import { getProjectsByChallengeId } from "../controllers/projects";

const projectsRouter = express.Router();

projectsRouter.get("/:challengeId", getProjectsByChallengeId);
projectsRouter.get(
  "/:challengeId/filter/tutor/:tutorId",
  getProjectsByChallengeId
);

export default projectsRouter;
