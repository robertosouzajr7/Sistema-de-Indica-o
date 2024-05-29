import express from "express";
import { createUser, listUserById } from "../controller/controllers.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/user/:id", listUserById);
export default router;
