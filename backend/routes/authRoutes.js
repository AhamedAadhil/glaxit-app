import express from "express";

import {
  company_register,
  login,
  logout,
  updatePassword,
} from "../controller/authController.js";
import { upload } from "../middleware/fileUploadMiddleware.js";
import { isValidToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/company_register", upload.single("document"), company_register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update_password", isValidToken, updatePassword);

export default router;
