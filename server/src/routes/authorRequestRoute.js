import { Router } from "express";
import { authenticateJWT, requireRole } from "../middlewares/auth.js";
import { cancelAuthorRequest, createAuthorRequest, getMyAuthorRequest } from "../controllers/authorRequestController.js";

const router = Router()

router.post('/author-request', authenticateJWT, requireRole("Reader"), createAuthorRequest)
router.get('/author-request', authenticateJWT, requireRole("Reader"), getMyAuthorRequest)
router.delete('/cancel-request', authenticateJWT, requireRole("Reader"), cancelAuthorRequest)

export default router