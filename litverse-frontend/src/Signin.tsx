import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F3E5AB] bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=228&q=80')] bg-cover bg-center bg-fixed">
      <div className="container mx-auto flex min-h-[90vh] items-center justify-center px-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#3E2723] text-center">
            <Book size={120} className="mx-auto mb-4" />
            <h1 className="text-4xl font-bold font-serif">LitVerse</h1>
          </div>
        </div>

        <div className="flex-1 max-w-[400px] text-center p-8 bg-white/90 rounded-lg shadow-xl mr-[100px]">
          <h1 className="text-2xl font-bold text-[#3E2723] mb-2 font-serif">Welcome Back</h1>
          <h2 className="text-lg text-[#3E2723]/80 mb-6 font-serif">Sign in to continue your journey</h2>

          <form onSubmit={handleSignin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full p-3 border-2 border-[#6D4C41] rounded-lg bg-transparent text-[#3E2723] font-serif focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-3 border-2 border-[#6D4C41] rounded-lg bg-transparent text-[#3E2723] font-serif focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
              required
            />
            <button 
              type="submit"
              className="w-full py-3 bg-[#8B5E3C] text-white rounded-full font-bold font-serif hover:bg-[#6D4C41] transition-colors"
            >
              Continue
            </button>
          </form>

          <p className="mt-6 text-[#3E2723]/80">Don't have an account?</p>
          <button 
            onClick={() => navigate('/signup')}
            className="w-full py-3 mt-2 bg-[#4B3D26] text-white rounded-full font-bold font-serif hover:bg-[#3E2723] transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>

      <footer className="text-center py-4 text-[#3E2723]/80">
        <p className="mb-4">
          <a href="#" className="hover:text-black">About</a> • 
          <a href="#" className="hover:text-black">Explore Books</a> • 
          <a href="#" className="hover:text-black">Genres</a> • 
          <a href="#" className="hover:text-black">Terms of Service</a> • 
          <a href="#" className="hover:text-black">Privacy Policy</a> • 
          <a href="#" className="hover:text-black">Contact</a> • 
          <a href="#" className="hover:text-black">Help</a>
        </p>
        <p>&copy; 2025 LitVerse.</p>
      </footer>
    </div>
  );
}

export default Signin;