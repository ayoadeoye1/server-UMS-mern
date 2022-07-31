import express from 'express';
import multer from 'multer';
import { user, signIn, signUp, delAcc } from '../controllers/auth.js';
import { post, posts, createPost } from '../controllers/post.js';
import { protectedEndpoint } from '../middleWares/protectedResource.js'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../../client/public/uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

//upload.single("image")

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/getuser', protectedEndpoint, user)
router.post('/delacc/:id', protectedEndpoint, delAcc)

router.get('/getposts', posts)
router.post('/getpost/:id', protectedEndpoint, post)
router.post('/createpost/:id', protectedEndpoint, createPost)



export default router