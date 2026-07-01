import Comment from "../models/commentSchema.js";
import Post from "../models/postSchema.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";



const getAllPost = async (req, res) => {

    try {
        const allPost = await Post.find({ isDeleted: false, status: "published" }).select("-isDeleted").populate({
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

        const post = await Post.findOne({ _id: id, isDeleted: false }).select("-isDeleted").populate({
            path: "author",
            select: "name -_id"
        });
        if (post === null) {
            return res.status(400).json({
                success: false,
                message: "Post not found with the given id ",
            })
        }
        if (post.commentsEnabled && post.comments.length > 0) {
            await post.populate({
                path: "comments",
                match: { isDeleted: false },
                select: "content  _id author updatedAt",
                populate: {
                    path: "author",
                    select: "name -_id"
                }
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

        const { keyword } = req.query;


        const searchedPost = await Post.find({
            title: { $regex: keyword, $options: "i" }, isDeleted: false
        }).select("-isDeleted").populate({
            path: "author",
            select: "name -_id"
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

        const post = await Post.find({ category, isDeleted: false }).select("-isDeleted")

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


        const post = await Post.find({ author: userId, isDeleted: false }).select("-isDeleted")

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
        const { title, description, category, commentsEnabled } = req.body;


        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Some field are missing"
            })
        }
        const allowedCategories = [
            "Technology",
            "Science",
            "Health",
            "Travel",
            "Business",
            "Finance"
        ];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category"
            });
        }
        const imagePath = req.file?.path;
        if (!imagePath) {
            return res.status(400).json({
                success: false,
                message: "Please upload image"
            })
        }
        const imageObj = await uploadToCloudinary(imagePath)
        const imageLink = imageObj.url;
        console.log("image", imageLink)
        if (!imageLink) {
            return res.status(400).json({
                success: false,
                message: "Please upload image"
            })
        }

        const newPost = new Post({
            title,
            description,
            category,
            commentsEnabled,
            image: imageLink,
            author: id
        })
        console.log(newPost)

        await newPost.save();
        console.log("new post saved")
        res.status(201).json({
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
    console.log("control here")
    console.log(req.body)
    try {

        const { id } = req.params;
        const userId = req.user.id;
        console.log(userId)
        const { title, description, category } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.author.toString() !== userId) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to update this post"
            })
        }

        let imageUrl = post.image;

        if (req.file) {
            const imagePath = req.file.path;
            const imageObj = await uploadToCloudinary(imagePath);
            imageUrl = imageObj.url;
        }


        const updatedPost = await Post.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            commentsEnabled: req.body.commentsEnabled,
            status: "pending",
            image: imageUrl
        }, { returnDocument: "after" }).select("-isDeleted")

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    console.log("control")
    try {
        const { id } = req.params;
        console.log(req.user)
        const userId = req.user.id;
        const post = await Post.findById({ _id: id, isDeleted: false });
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found"
            })
        }


        post.isDeleted = true;

        //check if post is deleted
        if (!post.isDeleted) {
            return res.status(400).json({
                success: false,
                message: "Post is not deleted"
            })
        }
        await post.save()

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",

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

        const postId = req.params.id

        const { comment } = req.body;
        const userId = req.user.id;

        const post = await Post.findById({ _id: postId });
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
            post: postId,
            author: userId,










            content: comment
        })

        await newComment.save();
        post.comments.push(newComment);
        await post.save();

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

const getAllComments = async (req, res) => {
    try {
        const authorId = req.user.id;

        const posts = await Post.find({
            author: authorId,
            isDeleted: false
        }).populate({
            path: "comments",
            match: { isDeleted: false },
            select: " -isDeleted",
            populate: [
                {
                    path: "author",
                    match: { isDeleted: false },
                    select: "name -_id ",
                },
                {
                    path: "post",
                    select: "title -_id",
                }
            ],

        })


        const allComments = posts.flatMap(post => post.comments || []);

        return res.status(200).json({
            success: true,
            comments: allComments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const AllFeaturedPost = async (req, res) => {
    const featuredPost = await Post.find({
        isFeatured: true
    }).select('-isDeleted -comments').populate({
        path: "author",
        select: "name -_id"
    }).limit(4)
    res.status(200).json({
        success: true,
        message: "Featured posts fetched successfully",
        featuredPost
    })
}




const deleteComment = async (req, res) => {
    const { id } = req.params;
    console.log("Comment id", id)
    const comment = await Comment.findById(id);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        })
    }

    comment.isDeleted = true;
    await comment.save();
    res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    })
}

export {
    getAllPost,
    getOnePost,
    getSearchedPost,
    getPostByCategory,
    getMyPost,
    createPost,
    updatePost,
    deletePost,
    addComents,
    deleteComment,
    AllFeaturedPost,
    getAllComments
}