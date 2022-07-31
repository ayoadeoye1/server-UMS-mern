import jwt from 'jsonwebtoken'
import AuthModel from '../models/auth.js'

const SECRET_KEY = process.env.SECRET_KEY

export const protectedEndpoint = async (req, res, next) =>{
    const { token } = req.body;

    if(!token){
        res.status(400).json({error: 'user not logged in'})
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY)
        if(!payload){
            res.status(400).json({error: 'user not logged in'})
        }
        const { _id } = payload;
        const dbUser = await AuthModel.findById(_id)
        req.dbUser = dbUser
        next()
    } catch (error) {
       console.log(error);
    }
}