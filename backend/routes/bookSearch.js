import express from 'express';
import { getBookByTitle } from '../controllers/bookSearch.js';

const router = express.Router();

// GET /api/book/search/:bookTitle - Get book details by title
router.get('/:bookTitle', getBookByTitle);

export default router;