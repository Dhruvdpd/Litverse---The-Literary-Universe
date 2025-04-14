import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/cover-image.jpg';
import logo from '../assets/logo_for_the_website_according_to_the.jpeg';

function Signin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/welcome', { state: { from: '/home' } });
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during sign in');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F3E5AB] bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto flex min-h-[90vh] items-center justify-center px-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#3E2723] text-center">
            <img src={logo} alt="LitVerse Logo" className="mx-auto mb-3 w-80 h-80" />
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
            {error && <p className="text-red-500">{error}</p>}
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
