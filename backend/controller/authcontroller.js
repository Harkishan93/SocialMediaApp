
import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const middleware = async(req,res,next)=>{
    const cookie1 = req.headers.cookie
    try {
        if(cookie1){
            const Token = cookie1.split("=")[1];
            const result = jwt.verify(Token,process.env.KEY);
            if(!result){
                return res.status(400).json("authorization fail");
            }
            req.id = result.id
            next()
            }else{
                res.status(400).json("cookie not found")
            }
    } catch (error) {
        console.log({"error":error.message})
    }
}

const registration = async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 12)
    req.body.password = pass
    const {username}=req.body;
    const usermodel = new User(req.body);
    try {
        const oldUser = await User.findOne({username})
        if(oldUser){
            return res.status(400).json({message:"username is already registered"})
        }
        const result = await usermodel.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "error": error.message });
        console.log({error:error.message})
    }
}
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await User.findOne({ username });
        if (result) {
            const passwordCompare = await bcrypt.compare(password, result.password);
            if(!passwordCompare){
                res.status(400).json({message:"Wrong Password"});
            }else{
                const Token = jwt.sign({username: result.username,id: result._id},process.env.KEY,{expiresIn:"2h"});
                res.cookie("user", Token,{
                    maxAge:7200000,
                    httpOnly:true,
                    sameSite:"Lax",
                })
                res.status(200).json({Token,result});
            }
        } else {
            res.status(400).json({ message: "user does not exists" })
        }
    } catch (error) {
        res.status(500).json({ "error": error.message })
        console.log({error:error.message});
    }
}
export { registration, login,middleware }