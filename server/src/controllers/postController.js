import Post from "../models/postSchema.js";



const getAllPost = async (req, res) => {
    console.log("Control here")
    try {
        const allPost = await Post.find().populate({
            path: 'author',
            select: 'name -_id'
        })

        if (allPost.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post: allPost
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


const getOnePost = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing id"
            })
        }

        const post = await Post.findById(id).populate({
            path: "author",
            select: "name -_id"
        });
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found with the given id ",
            })
        }

        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSearchedPost = async (req, res) => {
    try {
        console.log("this func")
        const { keyword } = req.query;
        console.log("this is my keyword", keyword)

        const searchedPost = await Post.find({
            title: { $regex: keyword, $options: "i" }
        })

        if (searchedPost.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Post not found with the given keyword "
            })
        }



        res.status(200).json({
            success: true,
            post: searchedPost
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getPostByCategory = async (req, res) => {

    try {
        const { category } = req.query;


        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Please provide category"
            })

        }

        const post = await Post.find({ category })

        if (post.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Post Not found with the given cateogry"
            })
        }

        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getMyPost = async (req, res) => {
    try {
        const userId = req.user.id;


        const post = await Post.find({ author: userId })

        if (post.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const createPost = async (req, res) => {

    try {
        const id = req.user.id;
        const { title, description, category, commentsEnabled, author, image } = req.body;

        if (!title || !description || !category || author) {
            return res.status(400).json({
                success: false,
                message: "Some field are missing"
            })
        }

        // const imagePath = req.file?.path;
        // if (!imagePath) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please upload image"
        //     })
        // }
        // const imageLink = await uploadToCloudinary(imagePath)

        // if (!imageLink) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please upload image"
        //     })
        // }

        const newPost = new Post({
            title,
            description,
            category,
            commentsEnabled,
            image,
            author
        })

        await newPost.save();

        res.status(200).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const updatePost = async (req, res) => {
    try {
        console.log("control uin update")
        const { id } = req.params;
        const { title, description, category } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.author !== userId) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to update this post"
            })
        }

        const updatedPost = await Post.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.author !== userId) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to delete this post"
            })
        }

        const deletePost = await Post.findByIdAndDelete(id);

        if (!deletePost) {
            return res.status(400).json({
                success: false,
                message: "Failed to delete post"
            })
        }

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            post: deletePost
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addComents = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        if (!post.commentsEnabled) {
            return res.status(400).json({
                success: false,
                message: "Comments are not enabled for this post"
            })
        }

        const newComment = new Comment({
            postId: id,
            userId,
            comment
        })

        await newComment.save();

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addComent = async (req, res) => {
    const { id, content } = req.body;
    const userId = req.params.id;
    console.log("req.body", req.body);
    console.log("req.params", req.params);
    const post = await Post.findById(id);
    if (!post || !post.commentsEnabled) {
        return res.status(404).json({
            message: "Post not found or comments are disabled",
            success: false,
        });
    }

    const comment = new Comment({
        author: userId,
        posts: post._id,
        content,
    });
    post.comments.push(comment);
    await post.save();
    await comment.save();
    res.status(201).json({ comment });
};






export {
    getAllPost,
    getOnePost,
    getSearchedPost,
    getPostByCategory,
    getMyPost,
    createPost,
    updatePost,
    deletePost,
    addComents
}