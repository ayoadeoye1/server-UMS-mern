import mongoose from "mongoose";

// import avater from './image/avater.jpg'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    author: {
        type: String,
        ref: 'AuthModel'
    }
})

export default mongoose.model('PostModel', postSchema);