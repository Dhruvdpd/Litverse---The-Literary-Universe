import express from 'express';
import { Author, Book, Genre } from '../models/book.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();
// POST api/books/add - Add a new book with enum genres
router.post('/add' , async (req, res) => {
    try {
      const {
        title,
        authorId,
        authorName,
        authorBio,
        description,
        coverImageUrl,
        genres,
        series,
        publishedDate
      } = req.body;
  
      // Validate required fields
      if (!title) {
        return res.status(400).json({ message: 'Book title is required' });
        console.log('Book title is required');
      }
  
      // Validate genres
      const validGenres = ['Romance', 'Horror', 'Sci-Fi', 'Fantasy', 'Mystery', 'Thriller', 
                           'Historical', 'Fiction', 'Non-Fiction', 'Biography', 'Self-Help', 
                           'Poetry', 'Dystopia', 'Zombies', 'Adventure', 'Comedy'];
      
      // Handle author - either use existing or create new
      let author;
      if (authorId) {
        author = await Author.findById(authorId);
        if (!author) {
          return res.status(404).json({ message: 'Author not found' });
          console.log('Author not found');
        }
      } else if (authorName) {
        // Create new author if name provided
        author = new Author({
          name: authorName,
          bio: authorBio || '',
          booksCount: 1
        });
        console.log('Author created');
        await author.save();
      } else {
        return res.status(400).json({ message: 'Author information is required' });
      }
      
      // Process genres - create or find genre documents
      const bookGenreIds = [];
      if (genres && genres.length > 0) {
        for (const genreName of genres) {
          if (validGenres.includes(genreName)) {
            // Find existing genre or create new one
            let genre = await Genre.findOne({ name: genreName });
            if (!genre) {
              genre = new Genre({ name: genreName });
              await genre.save();
            }
            bookGenreIds.push(genre._id);
          }
        }
      }
  
      // Create the new book
      const newBook = new Book({
        title,
        author: author._id,
        description: description || '',
        coverImageUrl: coverImageUrl || '',
        genres: bookGenreIds,
        series: series || null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        rating: 0,
        ratingsCount: 0,
        reviews: []
      });
      console.log('New book created');
      await newBook.save();
  
      // Update author's book count if using existing author
      if (authorId) {
        await Author.findByIdAndUpdate(
          authorId, 
          { $inc: { booksCount: 1 } }
        );
      }
  
      res.status(201).json({
        message: 'Book added successfully',
        book: {
          id: newBook._id,
          title: newBook.title,
          genres: genres.filter(genre => validGenres.includes(genre)),
          author: {
            id: author._id,
            name: author.name
          }
        }
      });
    } catch (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

export default router;