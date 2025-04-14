import express from 'express';
import { getAllPosts, getPostsByCommunity, createPost, updatePost } from '../controllers/postController.js';
import upload from '../middleware/multer.js'; // Import multer configuration
import Post from '../models/Post.js';


const router = express.Router();

router.get('/', getAllPosts);
router.get('/community/:community', getPostsByCommunity);
router.post('/',upload.single('image'), createPost);
router.patch('/:id', updatePost);

// 1. Like a post (increment upvotes)
router.patch('/:id/like', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error liking post' });
  }
});

// 2. Add a comment to a post
router.post('/:id/comment', async (req, res) => {
  const { content, author } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ content, author });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});


router.post('/', upload.single('image'), async (req, res) => {
    try {
      const { title, content, author, community } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : '';
  
      const newPost = new Post({
        title,
        content,
        author,
        community,
        image // Store the image path in the database
      });
  
      await newPost.save();
      res.json(newPost);
    } catch (err) {
      res.status(500).json({ message: 'Error creating post', error: err });
    }
  });


export default router;