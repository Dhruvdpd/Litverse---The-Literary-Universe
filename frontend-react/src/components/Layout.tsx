import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, Users, Library, BookMarked, Settings, Bell, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 fixed h-full">
        <Link to="/" className="text-2xl font-bold text-[#653c8c] mb-8 block">LitVerse</Link>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center space-x-3 text-gray-700 hover:text-[#653c8c] p-2 rounded-lg hover:bg-gray-100">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/bookexplore" className="flex items-center space-x-3 text-gray-700 hover:text-[#653c8c] p-2 rounded-lg hover:bg-gray-100">
            <BookOpen size={20} />
            <span>Explore</span>
          </Link>
          <Link to="/my-books" className="flex items-center space-x-3 text-gray-700 hover:text-[#653c8c] p-2 rounded-lg hover:bg-gray-100">
            <Library size={20} />
            <span>My Books</span>
          </Link>
          <div className="flex items-center space-x-3 text-gray-700 hover:text-[#653c8c] p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <BookMarked size={20} />
            <span>Reading Lists</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700 hover:text-[#653c8c] p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Users size={20} />
            <span>Community</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 mr-64">
        {/* Top Banner */}
        <div className="bg-[#e6c7de] text-center py-3 font-bold">
          <span>📚 Compelling Reads for Women's History Month</span>
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-white border-l border-gray-200 p-4 fixed right-0 h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-4">
            <Bell size={20} className="text-gray-600 cursor-pointer hover:text-[#653c8c]" />
            <MessageSquare size={20} className="text-gray-600 cursor-pointer hover:text-[#653c8c]" />
          </div>
          <Settings size={20} className="text-gray-600 cursor-pointer hover:text-[#653c8c]" />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Reading Goals</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">2024 Reading Challenge</p>
            <p className="font-bold">12 of 50 books read</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-[#653c8c] h-2.5 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-700 mt-6">Currently Reading</h3>
          <div className="space-y-3">
            {/* Add currently reading books here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;