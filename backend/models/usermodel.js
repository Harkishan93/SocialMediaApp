import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    coverpicture: String,
    profilepicture: String,
    livesin:String,
    about: String,
    worksat: String,
    country:String,
    relationship: String,
    followers: [],
    following: []
}, { timestamps: true });
export default mongoose.model('Users', userSchema)
