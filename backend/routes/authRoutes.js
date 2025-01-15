import express from "express";

import { company_register, login } from "../controller/authController.js";

const router = express.Router();

router.post("/company_register", company_register);
router.post("/login", login);

export default router;
