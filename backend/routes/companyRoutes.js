import expres from "express";
import { isValidToken } from "../middleware/authMiddleware.js";
import { getProfile } from "../controller/companyController.js";

const router = expres.Router();

router.get("/profile", isValidToken, getProfile);

export default router;
