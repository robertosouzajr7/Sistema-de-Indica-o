import express from "express";
import {
  createUser,
  listAllUser,
  listUserById,
} from "../controller/controllers.js";
import {
  createLeadController,
  listLeadsByUserController,
} from "../controller/leadsController.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/user/:id", listUserById);
router.get("/contacts", listAllUser);
router.post("/leads", createLeadController);
router.get("/users/:userId/leads", listLeadsByUserController);
export default router;
