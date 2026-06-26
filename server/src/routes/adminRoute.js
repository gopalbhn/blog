import { Router } from "express";
import { authenticateJWT, requireRole } from "../middlewares/auth.js";
import { deleteComment, deletePost } from "../controllers/postController.js";
import { deleteUser, demoteUser, getAllAdminPost, getAllUser, promoteUser,featurePost,unfeaturePost, recentUser, recentPost, publishPost, getAllDashboardStats } from "../controllers/adminController.js";

const router = new Router();

router.get('/all-users',authenticateJWT,requireRole("Admin"),getAllUser)
router.get('/all-post',authenticateJWT,requireRole("Admin"),getAllAdminPost)
router.get('/recent-user',authenticateJWT,requireRole("Admin"),recentUser)
router.get('/recent-post',authenticateJWT,requireRole("Admin"),recentPost)
router.delete('/delete-user/:id',authenticateJWT,requireRole("Admin"),deleteUser)
router.put('/promote-user/:id',authenticateJWT,requireRole("Admin"),promoteUser)
router.put('/demote-user/:id',authenticateJWT,requireRole("Admin"),demoteUser)
router.delete("/delete-comment/:id", authenticateJWT, requireRole("Admin"), deleteComment)
router.delete("/delete-post/:id", authenticateJWT, requireRole("Admin"), deletePost)
router.put("/feature/:id", authenticateJWT, requireRole("Admin"),featurePost)
router.put("/unfeature/:id", authenticateJWT, requireRole("Admin"), unfeaturePost)
router.put("/publish-post/:id",authenticateJWT,requireRole("Admin"),publishPost)
// router.get('/dashboard-stats',authenticateJWT,requireRole("Admin"),getAllDashboardStats)
router.get('/dashboard-stats',getAllDashboardStats)


export default router



