import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const genres = [
  "Fiction", "Fantasy", "Mystery", "Romance", "Science Fiction",
  "Horror", "Historical Fiction", "Young Adult", "Literary Fiction",
  "Thriller", "Non-Fiction", "Biography", "Self-Help", "Poetry"
];

type Step = 'initial' | 'signup' | 'personality';

interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [personality, setPersonality] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [error, setError] = useState('');

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('personality');
  };

  const handlePersonalitySubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...userData,
          personality,
          favoriteGenres: selectedGenres
        })
      });
  
      const data = await response.json();
      console.log(data.token)
      console.log(data)
      if (!response.ok) {
        alert(data.message || 'Signup failed');
        return;
      }
     
      // Optionally: store token in localStorage
      localStorage.setItem('token', data.token);
  
      // Navigate to home after successful signup
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const renderInitialView = () => (
    <>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[#3E2723] text-center">
          <Book size={120} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-serif">LitVerse</h1>
        </div>
      </div>

      <div className="flex-1 max-w-[400px] text-center p-8 bg-white/90 rounded-lg shadow-xl mr-[100px]">
        <h1 className="text-2xl font-bold text-[#3E2723] mb-2 font-serif">Welcome to LitVerse</h1>
        <h2 className="text-lg text-[#3E2723]/80 mb-6 font-serif">Join the world of stories.</h2>

        <button className="w-full py-3 mb-4 flex items-center justify-center bg-transparent border-2 border-[#6D4C41] text-[#3E2723] rounded-full font-bold font-serif">
          <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" 
               alt="Google Logo" 
               className="w-6 h-6 mr-2" />
          Sign up with Google
        </button>

        <button className="w-full py-3 mb-4 flex items-center justify-center bg-transparent border-2 border-[#6D4C41] text-[#3E2723] rounded-full font-bold font-serif">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
               alt="Apple Logo" 
               className="w-6 h-6 mr-2" />
          Sign up with Apple
        </button>

        <p className="text-[#3E2723]/60 my-4">or</p>

        <button 
          onClick={() => setCurrentStep('signup')}
          className="w-full py-3 bg-[#8B5E3C] text-white rounded-full font-bold font-serif hover:bg-[#6D4C41] transition-colors"
        >
          Create an Account
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <p className="mt-4 text-sm text-[#3E2723]/70">
          By signing up, you agree to the <a href="#" className="text-[#6D4C41] hover:text-[#8B5E3C]">Terms of Service</a> and{' '}
          <a href="#" className="text-[#6D4C41] hover:text-[#8B5E3C]">Privacy Policy</a>.
        </p>

        <p className="mt-6 text-[#3E2723]/80">Already a member?</p>
        <button 
          onClick={() => navigate('/signin')}
          className="w-full py-3 mt-2 bg-[#4B3D26] text-white rounded-full font-bold font-serif hover:bg-[#3E2723] transition-colors"
        >
          Sign in
        </button>
      </div>
    </>
  );

  const renderSignupForm = () => (
    <>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[#3E2723] text-center">
          <Book size={120} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-serif">LitVerse</h1>
        </div>
      </div>

      <div className="flex-1 max-w-[400px] text-center p-8 bg-white/90 rounded-lg shadow-xl mr-[100px]">
        <h1 className="text-2xl font-bold text-[#3E2723] mb-2 font-serif">Create Your Account</h1>
        <h2 className="text-lg text-[#3E2723]/80 mb-6 font-serif">Tell us about yourself</h2>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full p-3 border-2 border-[#6D4C41] rounded-lg bg-transparent text-[#3E2723] font-serif focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            className="w-full p-3 border-2 border-[#6D4C41] rounded-lg bg-transparent text-[#3E2723] font-serif focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full p-3 border-2 border-[#6D4C41] rounded-lg bg-transparent text-[#3E2723] font-serif focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button 
          onClick={() => setCurrentStep('initial')}
          className="w-full py-3 mt-4 bg-transparent border-2 border-[#6D4C41] text-[#3E2723] rounded-full font-bold font-serif hover:bg-[#6D4C41] hover:text-white transition-colors"
        >
          Back
        </button>
      </div>
    </>
  );

  const renderPersonalityView = () => (
    <>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[#3E2723] text-center">
          <Book size={120} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold font-serif">LitVerse</h1>
        </div>
      </div>

      <div className="flex-1 max-w-[400px] text-center p-8 bg-white/90 rounded-lg shadow-xl mr-[100px]">
        <h1 className="text-2xl font-bold text-[#3E2723] mb-2 font-serif">Tell Us About Yourself</h1>
        <h2 className="text-lg text-[#3E2723]/80 mb-6 font-serif">Help us personalize your reading journey</h2>

        <div className="mb-6">
          <textarea
            placeholder="Describe your personality, interests, and what you look for in books..."
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="w-full p-4 border-2 border-[#6D4C41] rounded-lg bg-transparent text-[#3E2723] font-serif resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#3E2723] mb-3 font-serif">Select Your Favorite Genres</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-full font-serif text-sm transition-colors
                  ${selectedGenres.includes(genre)
                    ? 'bg-[#8B5E3C] text-white'
                    : 'bg-transparent border-2 border-[#6D4C41] text-[#3E2723]'
                  }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button 
          onClick={handlePersonalitySubmit}
          className="w-full py-3 bg-[#8B5E3C] text-white rounded-full font-bold font-serif hover:bg-[#6D4C41] transition-colors"
        >
          Continue
        </button>

        <button 
          onClick={() => setCurrentStep('signup')}
          className="w-full py-3 mt-4 bg-transparent border-2 border-[#6D4C41] text-[#3E2723] rounded-full font-bold font-serif hover:bg-[#6D4C41] hover:text-white transition-colors"
        >
          Back
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F3E5AB] bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=228&q=80')] bg-cover bg-center bg-fixed">
      <div className="container mx-auto flex min-h-[90vh] items-center justify-center px-4">
        {currentStep === 'initial' && renderInitialView()}
        {currentStep === 'signup' && renderSignupForm()}
        {currentStep === 'personality' && renderPersonalityView()}
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

export default Signup;