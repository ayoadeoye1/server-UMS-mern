import AuthModel from '../models/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const S_KEY = process.env.SECRET_KEY
// console.log(S_KEY)

export const delAcc = async(req, res) =>{
    const { _id } = await req.dbUser
    const user = await AuthModel.findById({_id: _id})
    const del = user.remove();
    if(del){
        res.status(201).json("user removed")
    }
}

export const user = async (req, res) =>{
    try {
        const { username, email } = await req.dbUser;
        res.status(200).json({username, email})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const signUp = async(req, res) =>{
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({error: 'all parameters are required'})
    }

    try { 
        const user = await AuthModel.findOne({email: email})
        if(user){
            return res.status(400).json({error: 'user with email alrealdy exist'})
        }
        const Hpassword = await bcrypt.hash(password, 20);
        const dbUser = new AuthModel({username, email, password: Hpassword})
        await dbUser.save();
        res.status(201).json({success: 'registeration success'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const signIn = async (req, res) =>{
    const {email, password} = req.body;
    // console.log(email, password)
    res.header("Access-Control-Allow-Origin", "https://ums-client.netlify.app:54783")
    if(!email || !password){
        return res.status(400).json({error: 'all parameters are required'})
    }else{

        try {
            const dbUser = await AuthModel.findOne({email: email})
            if(!dbUser){
                return res.status(400).json({error: 'user does not exist'})
            }
            const confPass = await bcrypt.compare(password, dbUser.password)
            if(confPass){
                const token = jwt.sign({_id: dbUser._id}, S_KEY, {expiresIn: 1000*60*60*2}) //{expiresInMinutes: 60*60}
                res.status(200).json({success: token})
            }else {
                res.status(400).json({error: 'invalid password'})
            }
        } catch (error) {
            res.status(400).json({error: error.message})
            
        }
    }
    
}