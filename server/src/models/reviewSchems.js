import { Schema, model } from 'mongoose'

const reviewSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true

    },
    postAuthor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    review: {
        type: String,
        required: true
    }

})

const Review = new model("Review", reviewSchema)

export default Review;