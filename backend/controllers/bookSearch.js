import { Author,Book, Review} from '../models/book.js';
import User from '../models/User.js';

const getBookByTitle = async (req, res) => {
  try {
    const bookTitle = req.params.bookTitle;
    console.log(bookTitle);
    const book = await Book.findOne({
      title: { $regex: new RegExp('^' + bookTitle + '$', 'i') }
    })
      .populate('author')
      .populate('genres')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          model: 'User',
          select: 'username profilePictureUrl'
        }
      });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
      console.log('Book not found');
    }

    const responseData = {
      book: {
        title: book.title,
        coverImageUrl: book.coverImageUrl,
        description: book.description,
        rating: book.rating,
        ratingsCount: book.ratingsCount,
        genres: book.genres.map(genre => genre.name),
        series: book.series,
        isNewRelease: book.isNewRelease
      },
      author: {
        name: book.author.name,
        bio: book.author.bio,
        photoUrl: book.author.photoUrl,
        location: book.author.location,
        booksCount: book.author.booksCount,
        followersCount: book.author.followersCount
      },
      reviews: book.reviews.map(review => ({
        username: review.user.username,
        profilePictureUrl: review.user.profilePictureUrl,
        content: review.content,
        date: review.date,
        likesCount: review.likesCount,
        replies: review.replies
      }))
    };

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getBookByTitle };

