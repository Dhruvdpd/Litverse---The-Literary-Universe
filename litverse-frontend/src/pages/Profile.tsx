// import React, { useState } from 'react';
// import { Home, Users, BookOpen } from 'lucide-react';


// import {
//     Book,
//     Home as HomeIcon,
//     Compass,
//     User,
//     Info,
//     ThumbsUp,
//     MessageCircle,
//     Share2
// } from 'lucide-react';

// import { Link } from 'react-router-dom';

// interface TabProps {
// id: string;
// label: string;
// content: React.ReactNode;
// }
  

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const tabs: TabProps[] = [
//     {
//       id: 'overview',
//       label: 'Overview',
//       content: (
//         <div>
//           <h2 className="text-xl font-bold mb-4">Overview</h2>
//           <p className="text-gray-700 mb-8">Welcome to Krushna Harde's profile! Here you can explore their contributions, interests, and creative works.</p>
          
//           <div className="mb-8">
//             <h3 className="text-lg font-bold mb-4">Favorite Genres</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-amber-50 p-4 rounded-lg">
//                 <h4 className="font-bold text-amber-900">Fiction</h4>
//                 <ul className="mt-2 space-y-1 text-sm text-gray-600">
//                   <li>• Fantasy & Science Fiction</li>
//                   <li>• Mystery & Thriller</li>
//                   <li>• Historical Fiction</li>
//                   <li>• Contemporary Literature</li>
//                 </ul>
//               </div>
//               <div className="bg-amber-50 p-4 rounded-lg">
//                 <h4 className="font-bold text-amber-900">Non-Fiction</h4>
//                 <ul className="mt-2 space-y-1 text-sm text-gray-600">
//                   <li>• Biography & Memoir</li>
//                   <li>• History & Politics</li>
//                   <li>• Science & Technology</li>
//                   <li>• Philosophy & Psychology</li>
//                 </ul>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div className="bg-amber-50 p-4 rounded-lg">
//                 <h4 className="font-bold text-amber-900">Poetry</h4>
//                 <ul className="mt-2 space-y-1 text-sm text-gray-600">
//                   <li>• Contemporary Poetry</li>
//                   <li>• Classical Verse</li>
//                   <li>• Haiku & Short Forms</li>
//                 </ul>
//               </div>
//               <div className="bg-amber-50 p-4 rounded-lg">
//                 <h4 className="font-bold text-amber-900">Drama & Scripts</h4>
//                 <ul className="mt-2 space-y-1 text-sm text-gray-600">
//                   <li>• Modern Theater</li>
//                   <li>• Screenplays</li>
//                   <li>• Radio Plays</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       id: 'stories',
//       label: 'Stories',
//       content: (
//         <div>
//           <h2 className="text-xl font-bold mb-4">Stories</h2>
//           <div className="bg-amber-50 p-6 rounded-lg">
//             <p className="text-gray-700 italic">No stories published yet. Your creative journey begins here!</p>
//             <button className="mt-4 bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors">
//               Write Your First Story
//             </button>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-amber-50">
//       {/* Left Sidebar */}
//       <aside className="w-64 bg-[#5E412F] h-screen fixed left-0 p-6 bg-opacity-90">
//         <div className="flex items-center gap-2 mb-8">
//           <Book className="text-white" size={32} />
//           <h1 className="text-2xl font-bold text-white font-serif">LitVerse</h1>
//         </div>

//         <nav className="space-y-2">
//           {[
//             { icon: HomeIcon, text: 'Home', path: '/home' },
//             { icon: User, text: 'Community', path: '/community' },
//             { icon: Compass, text: 'Book Exploration', path: '/bookexplore' },
//             { icon: Info, text: 'About', path: '/about' },
//             { icon: User, text: 'Profile', path: '/profile' },
//             { icon: HomeIcon, text: 'Logout', path: '/signin' },
//           ].map(({ icon: Icon, text, path }) => (
//             <Link
//               key={text}
//               to={path}
//               className="flex items-center gap-3 text-white w-full p-3 rounded-lg hover:bg-[#8B5E3C] transition-colors"
//             >
//               <Icon size={20} />
//               <span className="font-serif">{text}</span>
//             </Link>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 ml-64 mr-80 py-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Cover Image */}
//           <div className="h-48 overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
//               alt="Cover"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Profile Info */}
//           <div className="relative px-6 py-4">
//             <div className="absolute -top-12 left-6">
//               <img
//                 src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full border-4 border-white"
//               />
//             </div>
//             <div className="ml-32">
//               <h1 className="text-2xl font-bold">Krushna Harde</h1>
//               <p className="text-gray-600">@KrushnaH88</p>
//               <p className="text-gray-500 text-sm">Joined January 2025</p>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-t border-gray-200">
//             <div className="flex">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   className={`flex-1 py-4 px-6 text-center font-medium ${
//                     activeTab === tab.id
//                       ? 'border-b-2 border-amber-700 text-amber-700'
//                       : 'text-gray-500 hover:text-amber-700'
//                   }`}
//                   onClick={() => setActiveTab(tab.id)}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//             <div className="p-6">
//               {tabs.find((tab) => tab.id === activeTab)?.content}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Right Sidebar */}
//       <aside className="w-80 bg-white p-6 fixed right-0 h-full border-l border-gray-200 overflow-y-auto">
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-xl font-bold mb-4">What's Trending</h2>
//             <div className="space-y-4">
//               <div className="p-4 bg-amber-50 rounded-lg">
//                 <h3 className="font-bold text-amber-900">#ModernPoetry</h3>
//                 <p className="text-sm text-gray-600">1.2K discussions</p>
//               </div>
//               <div className="p-4 bg-amber-50 rounded-lg">
//                 <h3 className="font-bold text-amber-900">#ShortStories</h3>
//                 <p className="text-sm text-gray-600">856 discussions</p>
//               </div>
//               <div className="p-4 bg-amber-50 rounded-lg">
//                 <h3 className="font-bold text-amber-900">#WritingTips</h3>
//                 <p className="text-sm text-gray-600">2.1K discussions</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h2 className="text-xl font-bold mb-4">Recommended Authors</h2>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50&q=80"
//                   alt="Author"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-bold">Sarah Mitchell</p>
//                   <p className="text-sm text-gray-600">@sarahwrites</p>
//                 </div>
//                 <button className="ml-auto bg-amber-700 text-white px-4 py-1 rounded-full text-sm hover:bg-amber-600 transition-colors">
//                   Follow
//                 </button>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <img
//                   src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50&q=80"
//                   alt="Author"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-bold">David Chen</p>
//                   <p className="text-sm text-gray-600">@dchen_writes</p>
//                 </div>
//                 <button className="ml-auto bg-amber-700 text-white px-4 py-1 rounded-full text-sm hover:bg-amber-600 transition-colors">
//                   Follow
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

interface TabProps {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface UserProfile {
  _id: string;
  name: string;
  username: string;
  email: string;
  personality: string;
  favoriteGenres: string[];
  createdAt?: string;
}

// Hardcoded genre descriptions
const genreDescriptions = {
  'Fiction': [
    '• Fantasy & Science Fiction',
    '• Mystery & Thriller',
    '• Historical Fiction'
  ],
  'Non-Fiction': [
    '• Biography & Memoir',
    '• History & Politics',
    '• Science & Technology'
  ],
  'Poetry': [
    '• Contemporary Poetry',
    '• Classical Verse',
    '• Haiku & Short Forms'
  ],
  'Drama': [
    '• Modern Theater',
    '• Screenplays',
    '• Radio Plays'
  ],
  'Mystery': [
    '• Detective Stories',
    '• Psychological Thrillers',
    '• Cozy Mysteries'
  ],
  'Science Fiction': [
    '• Space Opera',
    '• Cyberpunk',
    '• Dystopian Fiction'
  ],
  'Fantasy': [
    '• Epic Fantasy',
    '• Urban Fantasy',
    '• Magical Realism'
  ],
  'Romance': [
    '• Contemporary Romance',
    '• Historical Romance',
    '• Paranormal Romance'
  ],
  'Horror': [
    '• Supernatural Horror',
    '• Psychological Horror',
    '• Gothic Fiction'
  ]
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hardcoded profile images
  const profileImage = "user.webp"
  const coverImage = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
  
  // Author images
  const author1Image = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50&q=80";
  const author2Image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50&q=80";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Make sure you have the auth token in headers if your API requires authentication
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setProfile(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Function to format date
  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return 'Joined recently';
    const date = new Date(dateString);
    return `Joined ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  // Create tabs content based on profile data
  const renderOverviewContent = () => (
    <div>
      <h2 className="text-xl font-bold mb-4">Overview</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700">{error}</div>
      ) : profile ? (
        <>
          <p className="text-gray-700 mb-8">
            Welcome to {profile.name}'s profile! Here you can explore their contributions, interests, and creative works.
            {profile.personality && <span className="block mt-2 italic">"{profile.personality}"</span>}
          </p>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Favorite Genres</h3>
            {profile.favoriteGenres && profile.favoriteGenres.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Dynamically generate genre boxes based on user's favorite genres */}
                {profile.favoriteGenres.map((genre, index) => (
                  <div key={index} className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-900">{genre}</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {genreDescriptions[genre as keyof typeof genreDescriptions]?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      )) || (
                        <>
                          <li>• Exploring new titles</li>
                          <li>• Discovering authors</li>
                          <li>• Building recommendations</li>
                        </>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900">Fiction</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Fantasy & Science Fiction</li>
                    <li>• Mystery & Thriller</li>
                    <li>• Historical Fiction</li>
                    <li>• Contemporary Literature</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900">Non-Fiction</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Biography & Memoir</li>
                    <li>• History & Politics</li>
                    <li>• Science & Technology</li>
                    <li>• Philosophy & Psychology</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900">Poetry</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Contemporary Poetry</li>
                    <li>• Classical Verse</li>
                    <li>• Haiku & Short Forms</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900">Drama & Scripts</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Modern Theater</li>
                    <li>• Screenplays</li>
                    <li>• Radio Plays</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-gray-700">Profile not found.</p>
        </div>
      )}
    </div>
  );

  const tabs: TabProps[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: renderOverviewContent(),
    },
    {
      id: 'stories',
      label: 'Stories',
      content: (
        <div>
          <h2 className="text-xl font-bold mb-4">Stories</h2>
          <div className="bg-amber-50 p-6 rounded-lg">
            <p className="text-gray-700 italic">No stories published yet. Your creative journey begins here!</p>
            <button className="mt-4 bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors">
              Write Your First Story
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-amber-50">
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
      <main className="flex-1 ml-64 mr-80 py-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 overflow-hidden">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="relative px-6 py-4">
            <div className="absolute -top-12 left-6">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white"
              />
            </div>
            <div className="ml-32">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-7 bg-gray-200 rounded animate-pulse w-48"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
              ) : error ? (
                <h1 className="text-2xl font-bold text-red-500">Error loading profile</h1>
              ) : profile ? (
                <>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-gray-600">@{profile.username}</p>
                  <p className="text-gray-500 text-sm">{formatJoinDate(profile.createdAt)}</p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">Krushna Harde</h1>
                  <p className="text-gray-600">@KrushnaH88</p>
                  <p className="text-gray-500 text-sm">Joined January 2025</p>
                </>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === tab.id
                      ? 'border-b-2 border-amber-700 text-amber-700'
                      : 'text-gray-500 hover:text-amber-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-white p-6 fixed right-0 h-full border-l border-gray-200 overflow-y-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">What's Trending</h2>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-bold text-amber-900">#ModernPoetry</h3>
                <p className="text-sm text-gray-600">1.2K discussions</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-bold text-amber-900">#ShortStories</h3>
                <p className="text-sm text-gray-600">856 discussions</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <h3 className="font-bold text-amber-900">#WritingTips</h3>
                <p className="text-sm text-gray-600">2.1K discussions</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Recommended Authors</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={author1Image}
                  alt="Author"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">Sarah Mitchell</p>
                  <p className="text-sm text-gray-600">@sarahwrites</p>
                </div>
                <button className="ml-auto bg-amber-700 text-white px-4 py-1 rounded-full text-sm hover:bg-amber-600 transition-colors">
                  Follow
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={author2Image}
                  alt="Author"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">David Chen</p>
                  <p className="text-sm text-gray-600">@dchen_writes</p>
                </div>
                <button className="ml-auto bg-amber-700 text-white px-4 py-1 rounded-full text-sm hover:bg-amber-600 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Profile;