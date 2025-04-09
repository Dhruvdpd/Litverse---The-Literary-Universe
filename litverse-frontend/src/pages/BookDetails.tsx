import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById, transformGoogleBookToBookDetails } from '../services/bookApi';
import { BookOpen, Book, Home as HomeIcon, Compass, User, Info } from 'lucide-react';
import type { BookDetails } from '../types/book';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  text: string;
  likes: number;
}

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [replyText, setReplyText] = useState<string>('');
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

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

    fetchBookDetails();
  }, [id]);

  const comments: Comment[] = [
    {
      id: 1,
      user: {
        name: 'Marty',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
      },
      date: 'August 15, 2024',
      text: "I'm a bit of a personal finance nut. I've been investing & teaching personal finance for about ten years...",
      likes: 10,
    },
    {
      id: 2,
      user: {
        name: 'Kai',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
      },
      date: 'March 14, 2022',
      text: 'Oof - this book was big major yikes. At first I was curious why my parents recommended me this book...',
      likes: 5,
    },
  ];

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
                <button className="bg-[#276749] text-white px-6 py-2 rounded-md hover:bg-[#1a4731] transition-colors">
                  Want to Read
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
                  Shop this Series
                </button>
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Reader Reviews</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{comment.user.name}</h4>
                      <p className="text-sm text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.text}</p>
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                      👍 Like <span>{comment.likes}</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
                      }
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      💬 Reply
                    </button>
                  </div>
                  {activeReplyId === comment.id && (
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#653c8c]"
                      />
                      <button className="bg-[#653c8c] text-white px-4 py-2 rounded-md hover:bg-[#4c2d66]">
                        Reply
                      </button>
                    </div>
                  )}
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
