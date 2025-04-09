import React from 'react';
import { Link } from 'react-router-dom';
import { Book, HomeIcon, User, Compass, Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
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
      <div className="flex-1 ml-64 mr-80">
        {/* Top Banner */}
        <div className="bg-[#e6c7de] text-center py-3 font-bold">
          <span>📚 Compelling Reads for Women's History Month</span>
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Right Sidebar */}
      <aside className="w-80 bg-[#5E412F] h-screen fixed right-0 p-6 bg-opacity-90">
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
              <button className="px-4 py-1 bg-[#8B5E3C] text-white rounded-full text-sm">
                Follow
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Layout;
