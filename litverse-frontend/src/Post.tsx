import React, { useState, useRef } from 'react';
import { Book, X, Image, BarChart2, Smile, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: [];
  community: string;
  topic: string;
}

function Post() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for hidden input
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCommunity = location.state?.community;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handlePost = async () => {
    if (!content.trim() || !selectedCommunity) return;

    const formData = new FormData();
    formData.append('title', content.split('\n')[0] || 'New Post');
    formData.append('content', content);
    formData.append('author', 'currentUser'); // Replace with actual current user
    formData.append('community', selectedCommunity);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      alert('Post created successfully!');
      navigate('/community');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Something went wrong while creating the post.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3E5AB] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#5E412F] h-screen fixed left-0 p-6 bg-opacity-90">
        <div className="flex items-center gap-2 mb-8">
          <Book className="text-white" size={32} />
          <h1 className="text-2xl font-bold text-white font-serif">LitVerse</h1>
        </div>
      </aside>

      {/* Post Container */}
      <main className="flex-1 px-6 mx-64">
        <div className="max-w-3xl mx-auto mt-6">
          <div className="bg-[#FFF5E1] rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[#E8D5B5]">
              <h2 className="text-xl font-bold text-[#3E2723]">
                Create Post in {selectedCommunity?.name}
              </h2>
              <button onClick={() => navigate('/community')} className="text-[#3E2723]">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    className="w-full min-h-[150px] bg-[#FFF5E1] text-[#3E2723] text-lg resize-none border-none focus:outline-none font-serif"
                    placeholder="What is happening?!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={triggerFileSelect}
                        className="text-[#8B5E3C] hover:text-[#6D4C41]"
                      >
                        <Image size={20} />
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="hidden"
                      />
                    </div>
                    <button
                      onClick={handlePost}
                      className="bg-[#8B5E3C] text-white px-6 py-2 rounded-full hover:bg-[#6D4C41] transition-colors font-serif"
                    >
                      Post
                    </button>
                  </div>

                  <p className="text-[#9E7E5F] text-sm mt-4">Everyone can reply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 bg-[#5E412F] h-screen fixed right-0 p-6 bg-opacity-90">
        <h2 className="text-xl font-bold text-white mb-4 font-serif">Community Guidelines</h2>
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-white font-bold">Posting Rules</h3>
            <ul className="text-white/60 list-disc ml-4 mt-2">
              <li>Be respectful and kind</li>
              <li>No spam or self-promotion</li>
              <li>Stay on topic</li>
              <li>Follow community guidelines</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Post;
