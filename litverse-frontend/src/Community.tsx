// import React, { useState, useEffect } from 'react';
// import { Book, ChevronDown, ThumbsUp, MessageCircle, Share2, Link as LinkIcon, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface Comment {
//   id: number;
//   content: string;
//   author: string;
//   timestamp: string;
// }

// interface CommunityPost {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   upvotes: number;
//   comments: Comment[];
//   community: string;
//   topic: string;
// }

// interface Community {
//   id: string;
//   name: string;
//   description: string;
//   topic: string;
//   memberCount: number;
// }

// const topics = {
//   Fiction: [
//     { id: 'fiction1', name: 'r/ModernFiction', description: 'Contemporary fiction discussion', topic: 'Fiction', memberCount: 12500 },
//     { id: 'fiction2', name: 'r/ClassicLiterature', description: 'Timeless literary works', topic: 'Fiction', memberCount: 8900 }
//   ],
//   Fantasy: [
//     { id: 'fantasy1', name: 'r/FantasyLovers', description: 'For fans of fantasy literature', topic: 'Fantasy', memberCount: 15600 },
//     { id: 'fantasy2', name: 'r/MagicalWorlds', description: 'Exploring magical realms', topic: 'Fantasy', memberCount: 9800 }
//   ],
//   'Sci-Fi': [
//     { id: 'scifi1', name: 'r/SciFiReaders', description: 'Science fiction enthusiasts', topic: 'Sci-Fi', memberCount: 18900 },
//     { id: 'scifi2', name: 'r/SpaceOpera', description: 'Epic space adventures', topic: 'Sci-Fi', memberCount: 7400 }
//   ],
//   Romance: [
//     { id: 'romance1', name: 'r/RomanceBooks', description: 'Romance literature discussion', topic: 'Romance', memberCount: 14300 },
//     { id: 'romance2', name: 'r/LoveStories', description: 'Share and discuss love stories', topic: 'Romance', memberCount: 6200 }
//   ],
//   Poetry: [
//     { id: 'poetry1', name: 'r/PoetryLovers', description: 'Poetry appreciation', topic: 'Poetry', memberCount: 11200 },
//     { id: 'poetry2', name: 'r/ModernPoets', description: 'Contemporary poetry', topic: 'Poetry', memberCount: 5600 }
//   ],
//   Horror: [
//     { id: 'horror1', name: 'r/HorrorLit', description: 'Horror literature fans', topic: 'Horror', memberCount: 16700 },
//     { id: 'horror2', name: 'r/SpookyStories', description: 'Share scary tales', topic: 'Horror', memberCount: 8300 }
//   ]
// };

// const initialPosts: CommunityPost[] = [
//   {
//     id: 1,
//     title: "The Future of AI in Science Fiction",
//     content: "Exploring how modern AI developments are influencing sci-fi literature...",
//     author: "TechReader",
//     upvotes: 45,
//     comments: [
//       { id: 1, content: "Great analysis!", author: "SciFiFan", timestamp: "2024-02-20T10:30:00Z" }
//     ],
//     community: "r/SciFiReaders",
//     topic: "Sci-Fi"
//   },
//   {
//     id: 2,
//     title: "Dragons in Modern Fantasy",
//     content: "How dragon mythology has evolved in contemporary fantasy...",
//     author: "DragonLore",
//     upvotes: 32,
//     comments: [],
//     community: "r/FantasyLovers",
//     topic: "Fantasy"
//   }
// ];

// function Community() {
//   const [activeTab, setActiveTab] = useState('posts');
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
//   const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
//   const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
//   const [isTopicsOpen, setIsTopicsOpen] = useState(false);
//   const [showComments, setShowComments] = useState<number | null>(null);
//   const [newComment, setNewComment] = useState('');
//   const [showShareLink, setShowShareLink] = useState<number | null>(null);
//   const navigate = useNavigate();

//   const handleLike = (postId: number) => {
//     setPosts(posts.map(post => 
//       post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
//     ));
//   };

//   const handleComment = (postId: number) => {
//     setShowComments(showComments === postId ? null : postId);
//   };

//   const addComment = (postId: number) => {
//     if (!newComment.trim()) return;

//     const comment: Comment = {
//       id: Date.now(),
//       content: newComment,
//       author: 'currentUser',
//       timestamp: new Date().toISOString()
//     };

//     setPosts(posts.map(post =>
//       post.id === postId
//         ? { ...post, comments: [...post.comments, comment] }
//         : post
//     ));

//     setNewComment('');
//   };

//   const handleShare = (postId: number) => {
//     setShowShareLink(showShareLink === postId ? null : postId);
//   };

//   const getPostLink = (postId: number) => {
//     return `${window.location.origin}/community/post/${postId}`;
//   };

//   return (
//     <div className="min-h-screen bg-[#F3E5AB] flex">
//       {/* Left Sidebar */}
//       <aside className="w-64 bg-[#5E412F] h-screen fixed left-0 p-6">
//         <div className="flex items-center gap-2 mb-8">
//           <Book className="text-white" size={32} />
//           <h1 className="text-2xl font-bold text-white">LitVerse</h1>
//         </div>

//         <div className="mt-6">
//           <button
//             onClick={() => setIsTopicsOpen(!isTopicsOpen)}
//             className="w-full flex items-center justify-between text-white p-3 rounded-lg hover:bg-[#8B5E3C]"
//           >
//             <span>Topics</span>
//             <ChevronDown className={`transform transition-transform ${isTopicsOpen ? 'rotate-180' : ''}`} />
//           </button>
//           {isTopicsOpen && (
//             <div className="mt-2 ml-4 space-y-2">
//               {Object.keys(topics).map(topic => (
//                 <button
//                   key={topic}
//                   onClick={() => {
//                     setSelectedTopic(topic);
//                     setSelectedCommunity(null);
//                   }}
//                   className={`w-full text-left text-white p-2 rounded hover:bg-[#8B5E3C] ${
//                     selectedTopic === topic ? 'bg-[#8B5E3C]' : ''
//                   }`}
//                 >
//                   {topic}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {selectedCommunity && (
//           <button
//             onClick={() => navigate('/post',{ state: { community: selectedCommunity.name}})}
//             className="w-full py-3 mt-6 bg-[#8B5E3C] text-white rounded-full font-bold hover:bg-[#6D4C41] transition-colors"
//           >
//             Create Post in {selectedCommunity.name}
//           </button>
//         )}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 px-6 mx-64">
//         <div className="max-w-3xl mx-auto py-6">
//           {selectedTopic && !selectedCommunity ? (
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold text-[#3E2723] mb-4">Communities in {selectedTopic}</h2>
//               {topics[selectedTopic as keyof typeof topics].map(community => (
//                 <div key={community.id} className="bg-white rounded-lg p-6 shadow-md">
//                   <h3 className="text-xl font-bold mb-2">{community.name}</h3>
//                   <p className="text-gray-600 mb-4">{community.description}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-500">{community.memberCount} members</span>
//                     <button
//                       onClick={() => setSelectedCommunity(community)}
//                       className="bg-[#8B5E3C] text-white px-4 py-2 rounded-full hover:bg-[#6D4C41]"
//                     >
//                       View Community
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : selectedCommunity ? (
//             <div className="space-y-6">
//               <div className="bg-white rounded-lg p-6 shadow-md">
//                 <h2 className="text-2xl font-bold mb-2">{selectedCommunity.name}</h2>
//                 <p className="text-gray-600">{selectedCommunity.description}</p>
//               </div>

//               {posts
//                 .filter(post => post.community === selectedCommunity.name)
//                 .map(post => (
//                   <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                     <div className="p-6">
//                       <h2 className="text-xl font-bold text-[#3E2723] mb-2">{post.title}</h2>
//                       <p className="text-[#3E2723]/80 mb-4">{post.content}</p>
//                       <div className="flex items-center justify-between text-[#3E2723]/60">
//                         <span>Posted by u/{post.author}</span>
//                         <div className="flex items-center gap-4">
//                           <button
//                             onClick={() => handleLike(post.id)}
//                             className="flex items-center gap-1 hover:text-blue-500"
//                           >
//                             <ThumbsUp size={18} />
//                             {post.upvotes}
//                           </button>
//                           <button
//                             onClick={() => handleComment(post.id)}
//                             className="flex items-center gap-1 hover:text-blue-500"
//                           >
//                             <MessageCircle size={18} />
//                             {post.comments.length}
//                           </button>
//                           <button
//                             onClick={() => handleShare(post.id)}
//                             className="hover:text-blue-500"
//                           >
//                             <Share2 size={18} />
//                           </button>
//                         </div>
//                       </div>

//                       {showShareLink === post.id && (
//                         <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
//                           <input
//                             type="text"
//                             value={getPostLink(post.id)}
//                             className="flex-1 bg-transparent"
//                             readOnly
//                           />
//                           <button
//                             onClick={() => {
//                               navigator.clipboard.writeText(getPostLink(post.id));
//                               setShowShareLink(null);
//                             }}
//                             className="ml-2 text-blue-500 hover:text-blue-600"
//                           >
//                             <LinkIcon size={18} />
//                           </button>
//                           <button
//                             onClick={() => setShowShareLink(null)}
//                             className="ml-2 text-gray-500 hover:text-gray-600"
//                           >
//                             <X size={18} />
//                           </button>
//                         </div>
//                       )}

//                       {showComments === post.id && (
//                         <div className="mt-4 space-y-4">
//                           {post.comments.map(comment => (
//                             <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="font-bold">u/{comment.author}</span>
//                                 <span className="text-sm text-gray-500">
//                                   {new Date(comment.timestamp).toLocaleDateString()}
//                                 </span>
//                               </div>
//                               <p>{comment.content}</p>
//                             </div>
//                           ))}
//                           <div className="flex gap-2">
//                             <input
//                               type="text"
//                               value={newComment}
//                               onChange={(e) => setNewComment(e.target.value)}
//                               placeholder="Write a comment..."
//                               className="flex-1 p-2 border rounded-lg"
//                             />
//                             <button
//                               onClick={() => addComment(post.id)}
//                               className="bg-[#8B5E3C] text-white px-4 py-2 rounded-lg hover:bg-[#6D4C41]"
//                             >
//                               Comment
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </article>
//                 ))}
//             </div>
//           ) : (
//             <div className="text-center text-[#3E2723] py-12">
//               <h2 className="text-2xl font-bold mb-4">Select a Topic to Explore Communities</h2>
//               <p>Choose from the topics menu on the left to discover communities and their posts.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Right Sidebar */}
//       <aside className="w-80 bg-[#5E412F] h-screen fixed right-0 p-6">
//         <h3 className="text-xl font-bold text-white mb-6">Popular Communities</h3>
//         <div className="space-y-4">
//           {Object.values(topics).flat().slice(0, 5).map((community) => (
//             <div key={community.id} className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
//               <span className="text-white">{community.name}</span>
//               <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors">
//                 Join
//               </button>
//             </div>
//           ))}
//           <button className="text-blue-400 hover:text-blue-300 w-full text-center mt-4">
//             See more
//           </button>
//         </div>
//       </aside>
//     </div>
//   );
// }

// export default Community;

import React, { useState, useEffect } from 'react';
import {
  Book, ChevronDown, ThumbsUp, Share2, Link as LinkIcon, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
}

interface Community {
  id: string;
  name: string;
  description: string;
  topic: string;
  memberCount: number;
}

const topics = {
  Fiction: [
    { id: 'fiction1', name: 'r/ModernFiction', description: 'Contemporary fiction discussion', topic: 'Fiction', memberCount: 12500 },
    { id: 'fiction2', name: 'r/ClassicLiterature', description: 'Timeless literary works', topic: 'Fiction', memberCount: 8900 }
  ],
  Fantasy: [
    { id: 'fantasy1', name: 'r/FantasyLovers', description: 'For fans of fantasy literature', topic: 'Fantasy', memberCount: 15600 },
    { id: 'fantasy2', name: 'r/MagicalWorlds', description: 'Exploring magical realms', topic: 'Fantasy', memberCount: 9800 }
  ],
  'Sci-Fi': [
    { id: 'scifi1', name: 'r/SciFiReaders', description: 'Science fiction enthusiasts', topic: 'Sci-Fi', memberCount: 18900 },
    { id: 'scifi2', name: 'r/SpaceOpera', description: 'Epic space adventures', topic: 'Sci-Fi', memberCount: 7400 }
  ],
  Romance: [
    { id: 'romance1', name: 'r/RomanceBooks', description: 'Romance literature discussion', topic: 'Romance', memberCount: 14300 },
    { id: 'romance2', name: 'r/LoveStories', description: 'Share and discuss love stories', topic: 'Romance', memberCount: 6200 }
  ],
  Poetry: [
    { id: 'poetry1', name: 'r/PoetryLovers', description: 'Poetry appreciation', topic: 'Poetry', memberCount: 11200 },
    { id: 'poetry2', name: 'r/ModernPoets', description: 'Contemporary poetry', topic: 'Poetry', memberCount: 5600 }
  ],
  Horror: [
    { id: 'horror1', name: 'r/HorrorLit', description: 'Horror literature fans', topic: 'Horror', memberCount: 16700 },
    { id: 'horror2', name: 'r/SpookyStories', description: 'Share scary tales', topic: 'Horror', memberCount: 8300 }
  ]
};

const topicImages: Record<string, string> = {
  Fiction: 'https://img.icons8.com/color/48/book-shelf.png',
  Fantasy: 'https://img.icons8.com/color/48/magic-wand.png',
  'Sci-Fi': 'https://img.icons8.com/color/48/rocket--v1.png',
  Romance: 'https://img.icons8.com/color/48/romance.png',
  Poetry: 'https://img.icons8.com/color/48/quill.png',
  Horror: 'https://img.icons8.com/color/48/ghost.png',
};

export default function Community() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [showShareLink, setShowShareLink] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  const handleShare = (postId: string) => {
    setShowShareLink(showShareLink === postId ? null : postId);
  };

  const getPostLink = (postId: string) => `${window.location.origin}/community/post/${postId}`;

  return (
    <div className="min-h-screen bg-[#F3E5AB] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#5E412F] h-screen fixed left-0 p-6">
        <div className="flex items-center gap-2 mb-8">
          <Book className="text-white" size={32} />
          <h1 className="text-2xl font-serif text-white">LitVerse</h1>
        </div>
        <button
            style={{
              marginTop: '15px',
              backgroundColor: '#8B5E3C',
              marginLeft: '7px',
              borderRadius: '8px',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'serif', // ✅ Corrected here
            }}
            
            onClick={() => { navigate('/home') }}
          >
            Home
          </button>
        <div className="mt-6 font-serif ">
          <button
            onClick={() => setIsTopicsOpen(!isTopicsOpen)}
            className="w-full flex items-center justify-between text-white p-3 rounded-lg hover:bg-[#8B5E3C]"
          >
            <span>Topics</span>
            <ChevronDown className={`transform transition-transform ${isTopicsOpen ? 'rotate-180' : ''}`} />
          </button>
          

          {isTopicsOpen && (
            <div className="mt-4 ml-2 space-y-3">
              {Object.keys(topics).map(topic => (
                <button
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setSelectedCommunity(null);
                    navigate(`/community/${topic}`, { state: { topic } });
                  }}
                  className={`w-full flex items-center gap-2 text-white p-2 rounded-lg hover:bg-[#8B5E3C] ${selectedTopic === topic ? 'bg-[#8B5E3C]' : ''}`}
                  style={{ backgroundColor: selectedTopic === topic ? '#8B5E3C' : '#A97454' }}
                >
                  <img src={topicImages[topic]} alt={topic} className="w-6 h-6" />
                  <span>{topic}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        {selectedCommunity && (
          <button
            onClick={() => navigate('/post', { state: { community: selectedCommunity.name } })}
            className="w-full py-3 mt-6 bg-[#8B5E3C] text-white rounded-full font-bold hover:bg-[#6D4C41] transition-colors"
          >
            Create Post in {selectedCommunity.name}
          </button>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 mx-64">
        <div className="max-w-3xl mx-auto py-6">
          {!selectedTopic ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#3E2723]">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
                alt="Placeholder"
                className="w-40 h-40 mb-6 opacity-80"
              />
              <h2 className="text-2xl font-serif mb-4">Select a Topic to Explore Communities</h2>
              <p className="text-center max-w-md font-serif">
                Choose from the genres in the sidebar to view popular communities and posts.
              </p>
            </div>
          ) : (
            <div className="text-center text-[#3E2723] py-12">
              <h2 className="text-2xl font-bold mb-4">{selectedTopic} Communities</h2>
              <p>Coming soon: list of posts under this topic.</p>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 bg-[#5E412F] h-screen fixed right-0 p-6">
        <h3 className="text-xl font-serif text-white mb-6">Popular Communities</h3>
        <div className="space-y-4">
          {Object.values(topics).flat().slice(0, 5).map((community) => (
            <div key={community.id} className="flex items-center justify-between bg-white/10 p-4 rounded-lg font-serif">
              <span className="text-white">{community.name}</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors font-serif">
                Navigate
              </button>
            </div>
          ))}
          <button className="text-blue-400 hover:text-blue-300 w-full text-center mt-4 font-serif">
            See more
          </button>
        </div>
      </aside>
    </div>
  );
}


