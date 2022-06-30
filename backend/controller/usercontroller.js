import User from "../models/usermodel.js"
import bcrypt from 'bcryptjs';


const getAllUser=async(req, res)=>{
   try {
      let users = await User.find();
      users = users.map((user)=>{
         const {password, ...otherDetail}=user._doc
         return otherDetail
      })
      res.status(200).json(users)
   } catch (error) {
      res.status(500).json({"error":error.message})
   }
}


const user = async (req, res) => {
   const id = req.params.id;

   try {
      const result = await User.findById(id);
      if (result) {
         const { password, ...userdetial } = result._doc;
         res.status(200).json(userdetial);
      } else {
         res.status(404).json({ message: "No such user exists" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message })
      console.log({ message: error.message })
   }
}
const userupdate = async (req, res) => {
   const id = req.params.id;
   const { currentid, useradmintstatus, password } = req.body;
     console.log(id,currentid)
   if (currentid === id || useradmintstatus) {
      try {
         if (password) {
            req.body.password = await bcrypt.hash(password, 12);
         }
         const result = await User.findByIdAndUpdate(id, req.body, { new: true });
         res.status(200).json(result)
      }
      catch (error) {
         console.log({ error: error.message });
         res.status(500).json({ error: error.message })
      }
   } else {
      res.status(403).json("Access Denied! you can only update your own profile")
   }
}

const userdelete = async (req, res) => {
   const id = req.params.id;
   const { currentid, useradmintstatus } = req.body;
   if (currentid === id || useradmintstatus) {
      try {
         const userdelete = await User.findByIdAndDelete(id)
         res.status(200).json({ message: "User deleted successfully" })
      } catch (error) {
         res.status(500).json({ error: error.message })
      }
   } else {
      res.status(403).json("Access Denied! you can only deleted your own profile")
   }

}
const followUser = async (req, res) => {
   const id = req.params.id
   const { _id } = req.body
   if (id === _id) {
      res.status(403).json({ error: "action forbidden" })
   } else {
      try {
         const followUser = await User.findById(id);
         const followingUser = await User.findById(_id);
         if (!followUser.followers.includes(_id)) {
            await followUser.updateOne({ $push: { followers: _id } });
            await followingUser.updateOne({ $push: { following: id } });
            res.status(200).json("User followed!")
         } else {
            res.status(403).json("User is Already followed by you")
         }

      } catch (err) {
         res.status(500).json(err.message);
      }
   }
}

const unfollowUser = async (req, res) => {
   const id = req.params.id
   const { _id } = req.body
   if (id === _id) {
      res.status(403).json({ error: "action forbidden" })
   } else {
      try {
         const followUser = await User.findById(id);
         const followingUser = await User.findById(_id);
         if (followUser.followers.includes(_id)) {
            await followUser.updateOne({ $pull: { followers: _id } });
            await followingUser.updateOne({ $pull: { following: id } });
            res.status(200).json("User unfollowed!")
         } else {
            res.status(403).json("User is not followed by you")
         }

      } catch (err) {
         res.status(500).json(err.message);
      }
   }
}
export { user, userupdate, userdelete, followUser, unfollowUser, getAllUser }