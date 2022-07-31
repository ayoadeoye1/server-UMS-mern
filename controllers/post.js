import PostModel from '../models/post.js';

export const posts = async (req, res) => {
    try {
        const post = await PostModel.find().sort('-created');
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const post = async (req, res) => {
    const { username } = req.dbUser;
    try {
        const userPost = await PostModel.find({author: username}).sort('-created');
        res.status(200).json(userPost)
    } catch (error) {  
        res.status(400).json(error.message);
    }
}

export const createPost = async (req, res) => {
    const { username } = await req.dbUser;
    const { title, article, image } = req.body;

    const PostD = {
        title,
        body: article,
        image,
        created: new Date(),
        author: username
    }

    try {
        const post = new PostModel(PostD)
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json(error.message);
    }
}
