import React from 'react';
import {
  Book,
  Home as HomeIcon,
  Compass,
  User,
  Info,
  ThumbsUp,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: number;
  image?: string;
}

const samplePosts: Post[] = [
  {
    id: 1,
    title: "Just finished reading 'The Midnight Library' - Here are my thoughts",
    content:
      'This book completely changed my perspective on life choices and parallel universes...',
    author: 'bookworm42',
    upvotes: 1234,
    comments: 89,
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: "Weekly Book Club Discussion: 'Project Hail Mary'",
    content:
      "Let's discuss Andy Weir's latest sci-fi masterpiece! What did you think about...",
    author: 'scifi_lover',
    upvotes: 856,
    comments: 156
  }
];

const sliderMessages = [
  'Explore LitVerse now!',
  'Join book lovers!',
  'Read. Share. Connect.',
  'Books. Insights. Community.',
  'Start your journey!'
];

function Home() {
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
            { icon: HomeIcon, text: 'Logout', path: '/signin' },
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
      <main className="flex-1 px-6 mx-64">
        <div className="max-w-3xl mx-auto space-y-6 py-6">
          {/* Slider Banner */}
          <div className="overflow-x-scroll py-4">
            <div className="flex space-x-4">
              {sliderMessages.map((msg, index) => (
                <div
                  key={index}
                  className="min-w-[200px] max-w-xs bg-[#fff4dc] text-[#3E2723] shadow-md rounded-xl p-4 font-serif flex-shrink-0"
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {samplePosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#3E2723] mb-2 font-serif">
                  {post.title}
                </h2>
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
                      {post.comments}
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
      </main>

      {/* Right Sidebar */}
      <aside className="w-70 bg-[#5E412F] h-screen fixed right-0 p-6 bg-opacity-90">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 font-serif">What's Trending</h2>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-white font-bold">#BookRecommendations</h3>
              <p className="text-white/60">1.2K discussions</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="text-white font-bold">#WritingPrompts</h3>
              <p className="text-white/60">890 discussions</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4 font-serif">Suggested Authors</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-white font-bold">John Smith</h3>
                <p className="text-white/60">Fantasy Author</p>
              </div>
        
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Home;
