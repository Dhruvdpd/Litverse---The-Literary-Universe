import React, { useState, useEffect } from 'react';
import { BookOpen, Book, Home as HomeIcon, Compass, User, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchBooks, transformGoogleBookToBookDetails } from '../services/bookApi';
import type { BookDetails, GoogleBookVolume } from '../types/book';

function BookExplore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<BookDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setSearchPerformed(true);
    try {
      const results = await searchBooks(searchQuery);
      const transformedBooks = results.map((book: GoogleBookVolume) =>
        transformGoogleBookToBookDetails(book)
      );
      setBooks(transformedBooks);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            { icon: HomeIcon, text: "Home", path: "/home" },
            { icon: User, text: "Community", path: "/community" },
            { icon: Compass, text: "Book Exploration", path: "/bookexplore" },
            { icon: Info, text: "About", path: "/about" },
            { icon: User, text: "Profile", path: "/profile" }
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
        <div className="text-center my-8">
          <div className="relative inline-block w-[60%]">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#653c8c] focus:border-transparent"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#653c8c] text-white px-4 py-2 rounded-md hover:bg-[#4c2d66] transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center text-gray-600">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-[#653c8c] border-t-transparent rounded-full mb-4"></div>
            <p>Searching for books...</p>
          </div>
        )}

        {searchPerformed && !isLoading && (
          <div className="text-center text-lg font-bold my-8 text-[#3E2723]">
            📖 {books.length} results for "{searchQuery}"
          </div>
        )}

        <div className="flex flex-col items-center px-4">
          {books.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id} className="w-[80%]">
              <div className="flex bg-[#FFF5E1] p-6 my-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  className="w-20 h-32 object-cover rounded-md mr-6"
                />
                <div>
                  <h2 className="text-lg font-bold text-[#3E2723]">{book.title}</h2>
                  <p className="text-[#5E412F] mt-1">by {book.author}</p>
                  <div className="text-sm mt-1 text-[#6D4C41]">
                    {book.rating > 0 ? (
                      <>
                        {"⭐".repeat(Math.floor(book.rating))} {book.rating.toFixed(1)} ·{" "}
                        {book.ratingsCount.toLocaleString()} ratings
                      </>
                    ) : (
                      "No ratings yet"
                    )}
                  </div>
                  <div className="text-xs text-[#9E7E5F] mt-1">
                    Published {book.publishedYear}
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button className="flex items-center gap-2 bg-[#388e3c] text-white px-4 py-2 rounded-md hover:bg-[#2d722f] transition-colors">
                      <BookOpen className="w-4 h-4" />
                      Want to Read
                    </button>
                    <button className="flex items-center gap-2 bg-[#f4f1ea] border border-[#653c8c] text-[#653c8c] px-4 py-2 rounded-md hover:bg-[#e9e6df] transition-colors">
                      📚 Get a copy
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {searchPerformed && !isLoading && books.length === 0 && (
            <div className="text-center text-gray-600 mt-8">
              No books found for "{searchQuery}". Try a different search term.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BookExplore;
