import { Router } from "express"

import {
    getAllPost,
    getOnePost,
    getSearchedPost,
    getPostByCategory,
    getMyPost,
    createPost,
    updatePost,
    deletePost,
    getAllComments,
    AllFeaturedPost,
    deleteComment,
    addComents
} from "../controllers/postController.js"
import upload from "../middlewares/multerConfig.js"
import { authenticateJWT, requireRole } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllPost)
router.get("/search", getSearchedPost)
router.get('/user-posts', authenticateJWT, getMyPost)
router.post('/create', upload.single("image"), authenticateJWT, createPost)
router.get("/get-all-comments", authenticateJWT, getAllComments)
router.delete("/delete-comment/:id", authenticateJWT, requireRole("Author"), deleteComment)
router.get("/featured", AllFeaturedPost)
router.get('/:id', getOnePost)
router.get("/filtered", getPostByCategory)
router.put("/update/:id", upload.single('image'), authenticateJWT, updatePost)
router.delete("/:id", authenticateJWT, requireRole("Author"), deletePost)
router.post('/add-comments/:id', authenticateJWT, addComents)

export default router;