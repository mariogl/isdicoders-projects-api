import express from "express";
import { getChallengeById, getChallenges } from "../controllers/challenges";

const challengesRouter = express.Router();

challengesRouter.get("/", getChallenges);
challengesRouter.get("/:challengeId", getChallengeById);

export default challengesRouter;
