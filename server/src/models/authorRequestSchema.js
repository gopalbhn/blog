import { Schema,model } from 'mongoose';
const authorRequestSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["pending","aproved","rejected"],
        default:'pending'
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
);

const AuthorRequest = new model('AuthorRequest',authorRequestSchema)
export default AuthorRequest;