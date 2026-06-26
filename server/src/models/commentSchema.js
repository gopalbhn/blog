import mongoose, { Schema } from "mongoose";


const commentSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema);;

export default Comment