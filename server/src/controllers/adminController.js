import Post from "../models/postSchema.js";
import Review from "../models/reviewSchems.js";
import User from "../models/userSchema.js";


const recentUser = async (req, res) => {
  try {
    const user = await User.find({ isDeleted: false }).sort({ updatedAt: -1 }).select('-password -isDeleted').limit(3)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Users not found"
      })
    }
    return res.status(200).json({
      success: true,

      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({
      role: {
        $ne: "Admin"
      },
      isVerified: {
        $eq: true
      },
      isDeleted: false
    }).select('-password')
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found"
      })
    }
    return res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    user.isDeleted = true
    await user.save()
    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const demoteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role === "Reader") {
      return res.status(400).json({
        success: false,
        message: "Can't Demote User Further",
      });
    }
    user.role = "Reader"

    await user.save();
    return res.status(200).json({
      success: true,
      message: "User role changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const promoteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role === "Author") {
      return res.status(400).json({
        success: false,
        message: "Can't Promote User Further",
      });
    }
    user.role = "Author"

    await user.save();
    return res.status(200).json({
      success: true,
      message: "User role changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
const recentPost = async (req, res) => {
  try {

    const post = await Post.find({
      isDeleted: false
    }).sort({ updatedAt: -1 }).select('-isDeleted -comments -author').limit(3)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Post found",
      post
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const publishPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      })
    }
    post.status = "published"
    await post.save()
    res.status(200).json({
      success: true,
      message: "Post published successfully",

    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const featurePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      })
    }
    if (post.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "Only Published Post Can Be Featured"
      })
    }
    let noOfFeaturedPost = await Post.find({
      isFeatured: true
    });
    if (noOfFeaturedPost.length >= 4) {
      return res.status(400).json({
        success: false,
        message: "You can only feature 4 posts",
        noOfFeaturedPost: noOfFeaturedPost.length
      })
    }
    if (post.isFeatured) {
      return res.status(400).json({
        success: false,
        message: "Post is already featured"
      })
    }
    post.isFeatured = true;
    await post.save()
    res.status(200).json({
      success: true,
      message: "Post featured successfully",

    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const unfeaturePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      })
    }
    if (!post.isFeatured) {
      return res.status(400).json({
        success: false,
        message: "Post is not featured"
      })
    }
    post.isFeatured = false;
    await post.save()
    res.status(200).json({
      success: true,
      message: "Post unfeatured successfully",

    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

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

const getAllAdminPost = async (req, res) => {

  try {
    const allPost = await Post.find({ isDeleted: false }).select("-isDeleted").populate({
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

const giveReview = async (req, res) => {
  try {
    const postId = req.params.id;
    const { review } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      })
    }
    const newReview = await Review.create({
      post: postId,
      review
    })
    res.status(200).json({
      success: true,
      message: "Review added successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getAllDashboardStats = async (req, res) => {
  try {
    const [
      totalPosts,
      totalUsers,
      totalPendingPosts,
      totalPublishedPosts,
      totalAuthors,
      totalReaders,
    ] = await Promise.all([
      Post.countDocuments(),
      User.countDocuments({ role: { $ne: "Admin" } }),
      Post.countDocuments({ status: "pending" }),
      Post.countDocuments({ status: "published" }),
      User.countDocuments({ role: "Author" }),
      User.countDocuments({ role: "Reader" }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalPosts,
        totalUsers,
        totalPendingPosts,
        totalPublishedPosts,
        totalAuthors,
        totalReaders,
      },
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export {
  recentUser,
  recentPost,
  getAllUser,
  deleteUser,
  demoteUser,
  promoteUser,
  publishPost,
  featurePost,
  unfeaturePost,
  getAllComments,
  getAllAdminPost,
  getAllDashboardStats,
  giveReview
}