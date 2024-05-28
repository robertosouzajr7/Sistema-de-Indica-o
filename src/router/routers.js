import express from "express";
import { createUser } from "../controller/controllers.js";

const router = express.Router();

router.post("/users", createUser);

export default router;
