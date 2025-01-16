import express from "express";

import {
  getInfoByToken,
  getPendingApprovels,
  toggleStatus,
} from "../controller/adminController.js";
import { isValidToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdminMiddleware.js";

const router = express.Router();

// GET APIs
router.get("/get_info_by_token", isValidToken, isAdmin, getInfoByToken);
router.get("/get_pending_requests", isValidToken, isAdmin, getPendingApprovels);

// PATCH APIs
router.patch("/toggle_status", isValidToken, isAdmin, toggleStatus);

export default router;
