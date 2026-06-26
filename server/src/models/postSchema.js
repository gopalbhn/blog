
import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,

    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["pending", "published"],
        default: "pending",
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    commentsEnabled: {
        type: Boolean,
        default: true,

    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: "Comment",
        default: []

    }
}, { timestamps: true })

const Post = model("Post", postSchema)
export default Post
