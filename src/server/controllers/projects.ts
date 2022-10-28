import { NextFunction, Request, Response } from "express";
import Project from "../../database/models/Project";
import sonarService from "./sonarService";

// eslint-disable-next-line import/prefer-default-export
export const getProjectsByChallengeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { challengeId, tutorId } = req.params;
    const { byCoverage } = req.query;

    const query: { challenge: string; tutor?: string } = {
      challenge: challengeId,
    };

    if (tutorId) {
      query.tutor = tutorId;
    }

    const projects = await Project.find(query)
      .sort({ student: 1 })
      .populate("tutor", "-password -username")
      .lean();

    let resultProjects = await sonarService(projects);

    if (byCoverage === "high" || byCoverage === "low") {
      resultProjects = resultProjects.filter((resultProject) =>
        byCoverage === "low"
          ? resultProject.sonarInfoFront.coverage < 80 ||
            resultProject.sonarInfoBack.coverage < 80
          : resultProject.sonarInfoFront.coverage >= 80 ||
            resultProject.sonarInfoBack.coverage >= 80
      );
    }

    res.json({ projects: resultProjects });
  } catch (error) {
    next(error);
  }
};
