import express from "express";
import { getChallenges } from "../controllers/challenges";

const challengesRouter = express.Router();

challengesRouter.get("/", getChallenges);

export default challengesRouter;
