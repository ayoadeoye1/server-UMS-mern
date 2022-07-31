import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    posts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostModel'
    }
})

export default mongoose.model('AuthModel', authSchema);