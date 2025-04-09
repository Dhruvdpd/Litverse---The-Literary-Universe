import React, { useState, useEffect } from 'react';
import {
  ThumbsUp, MessageCircle, Share2, Book, Home as HomeIcon, Compass, Info, User
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

interface CommunityPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: any[];
  community: string;
  topic: string;
  createdAt: string;
  image?: string;
}

export default function ComPosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const communityName = location.state?.topic;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = communityName
    ? posts.filter(post => post.community.toLowerCase() === communityName.toLowerCase())
    : [];

  return (
    <div className="flex">
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
      <div className="ml-64 min-h-screen bg-[#F3E5AB] px-8 py-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#3E2723]">Posts</h2>
          <button
            onClick={() => navigate('/post', { state: { community: communityName } })}
            className="bg-[#5E412F] text-white px-5 py-2 rounded-lg hover:bg-[#6D4C41] transition-all"
          >
            + Create Post
          </button>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-gray-700">No posts found for this topic.</p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredPosts.map(post => (
              <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#3E2723] mb-2 font-serif">{post.title}</h2>
                  <p className="text-[#3E2723]/80 mb-4 font-serif">{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover mb-4 rounded-lg"
                    />
                  )}
                  <div className="flex items-center justify-between text-[#3E2723]/60">
                    <span className="font-serif">Posted by u/{post.author}</span>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1">
                        <ThumbsUp size={18} />
                        {post.upvotes}
                      </button>
                      <button className="flex items-center gap-1">
                        <MessageCircle size={18} />
                        {post.comments.length}
                      </button>
                      <button>
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
