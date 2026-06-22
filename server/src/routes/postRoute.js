import { Router } from "express"

import {
    getAllPost,
    getOnePost,
    getSearchedPost,
    getPostByCategory,
    getMyPost,
    createPost,
    updatePost,
    deletePost
} from "../controllers/postController.js"
import upload from "../middlewares/multerConfig.js"
// import { athunticateJwt, isAuthor } from "../middlewares/auth.js"

const router = Router();

router.get("/", getAllPost)
router.get("/search", getSearchedPost)
router.get('/:id', getOnePost)
router.get("/filtered", getPostByCategory)
router.put("/update/:id", updatePost)


// router.post('/', upload.single("postImage"), athunticateJwt, isAuthor, createPost)
// router.patch('/edit-post/:id', upload.single("postImage"), athunticateJwt, isAuthor, updatePost)
// router.get('/user-posts/:id', athunticateJwt, isAuthor, getMyPost)
// router.get("/post-category/:category", athunticateJwt, isAuthor, getPostByCategory)
// router.delete('/:id', athunticateJwt, deletePost)
// router.post('/add-comments/:id', athunticateJwt, addComents)

export default router;