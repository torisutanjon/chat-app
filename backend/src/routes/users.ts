import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.post("/create", userController.createAccount);
router.post("/login", userController.loginAccount);
router.post("/send-verification", userController.sendVerification);
router.post("/confirm-verification", userController.confirmVerification);

export default router;
