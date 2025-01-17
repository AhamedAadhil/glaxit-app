import express from "express";

import {
  company_register,
  login,
  logout,
} from "../controller/authController.js";
import { upload } from "../middleware/fileUploadMiddleware.js";

const router = express.Router();

router.post("/company_register", upload.single("document"), company_register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
