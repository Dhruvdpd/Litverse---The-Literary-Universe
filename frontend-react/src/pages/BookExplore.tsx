import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  numRatings: number;
  numReviews: number;
  publishedYear: number;
  editions: number;
  coverUrl: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "How to Kill Your Family",
    author: "Bella Mackie",
    rating: 3.53,
    numRatings: 159729,
    numReviews: 17794,
    publishedYear: 2021,
    editions: 62,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300"
  },
  {
    id: 2,
    title: "How to Kill Men and Get Away With It",
    author: "Katy Brent",
    rating: 3.68,
    numRatings: 86727,
    numReviews: 5176,
    publishedYear: 2023,
    editions: 16,
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200&h=300"
  },
  {
    id: 3,
    title: "How to Kill A Rockstar",
    author: "Tiffanie Debartolo",
    rating: 4.06,
    numRatings: 15659,
    numReviews: 2098,
    publishedYear: 2005,
    editions: 4,
    coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=200&h=300"
  },
  {
    id: 4,
    title: "How to Kill your Bestfriend",
    author: "Lexie Elliott",
    rating: 3.39,
    numRatings: 5158,
    numReviews: 749,
    publishedYear: 2021,
    editions: 11,
    coverUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=200&h=300"
  }
];

function BookExplore() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Search Container */}
      <div className="text-center my-8">
        <input
          type="text"
          className="w-[60%] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#653c8c] focus:border-transparent"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results Header */}
      <div className="text-center text-lg font-bold my-8">
        📖 3187 results for "How to kill"
      </div>

      {/* Book List */}
      <div className="flex flex-col items-center px-4">
        {books.map((book) => (
          <Link to={`/book/${book.id}`} key={book.id} className="w-[80%]">
            <div className="flex bg-white p-6 my-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-20 h-auto object-cover rounded-md mr-6"
              />
              <div>
                <h2 className="text-lg font-bold">{book.title}</h2>
                <p className="text-gray-600 mt-1">by {book.author}</p>
                <div className="text-sm mt-1">
                  {"⭐".repeat(Math.floor(book.rating))} {book.rating.toFixed(2)} · {" "}
                  {book.numRatings.toLocaleString()} ratings · {book.numReviews.toLocaleString()} reviews
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Published {book.publishedYear} · <span className="text-[#653c8c] hover:underline">{book.editions} Editions</span>
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
      </div>
    </div>
  );
}

export default BookExplore;