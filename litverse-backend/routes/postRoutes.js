import express from 'express';
import { getAllPosts, getPostsByCommunity, createPost, updatePost } from '../controllers/postController.js';
import Post from '../models/Post.js';


const router = express.Router();

router.get('/', getAllPosts);
router.get('/community/:community', getPostsByCommunity);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;