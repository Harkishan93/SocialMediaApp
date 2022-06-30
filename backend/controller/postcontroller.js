import Post from "../models/postmodel.js";
import User from "../models/usermodel.js";
import mongoose from "mongoose";

const sharepost = async (req, res) => {
    const result = new Post(req.body);
    try {
        await result.save()
        res.status(200).json('Post Created')
    } catch (error) {
        res.status(500).json(error.message);
    }
}
const getpost = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Post.findById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
const updatepost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    try {
        const post = await Post.findById(id)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json('post updated');
        } else {
            res.status(403).json('action forbidden');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
const deletepost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body
    try {
        const post = await Post.findById(id)
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json('post deleted');
        } else {
            res.status(403).json('action forbidden');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
const likespost = async(req,res)=>{
    const id = req.params.id
    const{userId}= req.body
    console.log(req.body);
    try {
        const post = await Post.findById(id);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}});
            res.status(200).json('liked');
        }else{
            await post.updateOne({$pull:{likes:userId}});
            res.status(200).json('disliked');
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const gettimelinepost= async(req, res)=>{
    const userId = req.params.id
    try {
        const currentuserpost =  await Post.find({userId});
        const followingposts = await User.aggregate([
            {
             $match:{
                 _id: mongoose.Types.ObjectId(userId)
             },
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"post"
                }
            },
            {
                $project:{
                    post:1,
                    _id:0
                }
            }
        ]);
        res.status(200).json(currentuserpost.concat(...followingposts[0].post).sort((a,b)=>{return b.createdAt-a.createdAt }));
    } catch (error) {
        res.status(500)
        console.log(error.message);
    }
}
export { sharepost, getpost, updatepost, deletepost, likespost, gettimelinepost }