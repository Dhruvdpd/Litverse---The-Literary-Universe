import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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

function BookDetails() {
  const { id } = useParams();
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const comments: Comment[] = [
    {
      id: 1,
      user: {
        name: "Marty",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
      },
      date: "August 15, 2024",
      text: "I'm a bit of a personal finance nut. I've been investing & teaching personal finance for about ten years...",
      likes: 10
    },
    {
      id: 2,
      user: {
        name: "Kai",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
      },
      date: "March 14, 2022",
      text: "Oof - this book was big major yikes. At first I was curious why my parents recommended me this book...",
      likes: 5
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Book Details Section */}
      <section className="flex gap-8 mb-12">
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
          alt="Book Cover"
          className="w-48 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">The First Days</h1>
          <p className="text-gray-600 mb-4"><strong>Author:</strong> Rhiannon Frater</p>
          <p className="text-gray-700 mb-4">
            A mini abridgement of the #1 Personal Finance book of all time, Wisdom from Rich Dad
            Poor Dad tells the story of Robert Kiyosaki and his two dads -- his real father and the father of his best friend,
            his rich dad --and the ways in which both men shaped his thoughts about investing.
          </p>
          <p className="mb-2"><strong>Rating:</strong> ⭐⭐⭐⭐ (3.77)</p>
          <p className="mb-4"><strong>Genres:</strong> Zombies, Horror, Fiction, Dystopia, Sci-Fi</p>
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

      {/* About Author Section */}
      <section className="mb-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">About the Author</h2>
        <div className="flex gap-6">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
            alt="Rhiannon Frater"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2">Rhiannon Frater</h3>
            <p className="text-gray-600 mb-2">64 books • 1,650 followers</p>
            <p className="text-gray-700">
              Rhiannon Frater is the award-winning author of the <em>As the World Dies</em> zombie trilogy,
              as well as independent works such as <em>The Last Bastion of the Living</em>.
              She was born and raised in Texas where she currently resides with her husband and furry children.
            </p>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Reader Reviews</h2>
        <div className="space-y-6">
          {comments.map(comment => (
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
                  onClick={() => setActiveReplyId(activeReplyId === comment.id ? null : comment.id)}
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
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#653c8c]"
                  />
                  <button className="bg-[#8d5524] text-white px-4 py-2 rounded-md hover:bg-[#724420] transition-colors">
                    Post
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookDetails;