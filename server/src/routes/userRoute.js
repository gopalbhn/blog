import { Router } from "express";
import { getInfo, LogOut, loginWithMagicLink, verifyMagicLink, registerUser, loginUser, googleLogin, googleCallback } from "../controllers/userController.js"
import { authenticateJWT } from "../middlewares/auth.js";

const router = Router();
router.get('/test', (req, res) => {
    res.send("success")
})
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/google-login', googleLogin);
router.get('/google-callback', googleCallback);
router.get("/verify/:token", verifyMagicLink);
router.post("/logout", LogOut)
router.get('/me', authenticateJWT, getInfo);

export default router;