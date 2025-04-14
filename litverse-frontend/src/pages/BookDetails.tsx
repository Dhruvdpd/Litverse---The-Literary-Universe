import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getBookById,
  transformGoogleBookToBookDetails,
} from '../services/bookApi';
import {
  BookOpen,
  Book,
  Home as HomeIcon,
  Compass,
  User,
  Info,
} from 'lucide-react';
import type { BookDetails } from '../types/book';



interface Review {
  _id: string;
  username: string;
  createdAt: string;
  content: string;
  likes: number;
}

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) return;

      try {
        const bookData = await getBookById(id);
        if (bookData) {
          const transformedBook = transformGoogleBookToBookDetails(bookData);
          setBook(transformedBook);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviews = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/reviews?bookId=${id}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBookDetails();
    fetchReviews();
  }, [id]);

  const handleShopClick = () => {
    if (book) {
      const query = `${book.title} ${book.author}`;
      const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  };

  const handleReviewSubmit = async () => {
    console.log('Submitting review:', newReview);
    if (!newReview.trim() || !id) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: id,
          content: newReview,
          username: 'AnonymousUser', // Replace with actual username from auth if available
        }),
      });

      const savedReview = await res.json();
      setReviews((prev) => [savedReview, ...prev]);
      setNewReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-[#653c8c] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-gray-600 mt-8">
        Book not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3E5AB] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#5E412F] h-screen fixed left-0 p-6 bg-opacity-90">
        <div className="flex items-center gap-2 mb-8">
          <Book className="text-white" size={32} />
          <h1 className="text-2xl font-bold text-white font-serif">LitVerse</h1>
        </div>
        <nav className="space-y-2">
          {[
            { icon: HomeIcon, text: 'Home', path: '/home' },
            { icon: User, text: 'Community', path: '/community' },
            { icon: Compass, text: 'Book Exploration', path: '/bookexplore' },
            { icon: Info, text: 'About', path: '/about' },
            { icon: User, text: 'Profile', path: '/profile' },
          ].map(({ icon: Icon, text, path }) => (
            <Link
              key={text}
              to={path}
              className="flex items-center gap-3 text-white w-full p-3 rounded-lg hover:bg-[#8B5E3C] transition-colors"
            >
              <Icon size={20} />
              <span className="font-serif">{text}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 ml-64 py-6 font-serif">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Book Details */}
          <section className="flex gap-8 mb-12">
            <img
              src={book.coverUrl}
              alt={`${book.title} cover`}
              className="w-48 h-72 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-gray-600 mb-4">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="text-gray-700 mb-4">{book.description}</p>
              {book.rating > 0 && (
                <p className="mb-2">
                  <strong>Rating:</strong> {'⭐'.repeat(Math.floor(book.rating))} (
                  {book.rating.toFixed(1)}) · {book.ratingsCount.toLocaleString()} ratings
                </p>
              )}
              {book.categories.length > 0 && (
                <p className="mb-4">
                  <strong>Genres:</strong> {book.categories.join(', ')}
                </p>
              )}
              <div className="flex gap-4">
                <button
                  onClick={handleShopClick}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Shop this Series
                </button>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Reader Reviews</h2>

            {/* Add a Review */}
            <div className="mb-6">
              <textarea
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#653c8c]"
                rows={4}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your thoughts about this book..."
              />
              <button
              onClick={handleReviewSubmit}
              className="mt-2 bg-[#653c8c] text-white px-4 py-2 rounded-md hover:bg-[#4c2d66]"
            >
              Submit
            </button>

            </div>

            {/* Display Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-6">
                  <div className="mb-2">
                    <h4 className="font-semibold">{review.username}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-2">{review.content}</p>
                  <div className="flex items-center gap-2 text-gray-600">
                    👍 {review.likes}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default BookDetailsPage;
