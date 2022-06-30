import mongoose from "mongoose";

const postmodel = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: String,
    likes: [],
    image: String
}, {
    timestamps: true
})
export default mongoose.model('posts', postmodel);