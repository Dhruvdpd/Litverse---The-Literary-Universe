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
  const [showCommentsForPost, setShowCommentsForPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);

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

  const handleLike = async (postId: string) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/posts/${postId}/like`);
      setPosts(posts.map(post => (post._id === postId ? res.data : post)));
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const toggleComments = (postId: string) => {
    setShowCommentsForPost(showCommentsForPost === postId ? null : postId);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${commentingPostId}/comment`,
        { content: newComment, author: 'User' }
      );
      setPosts(posts.map(post => (post._id === commentingPostId ? res.data : post)));
      setNewComment('');
      setCommentingPostId(null);
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div className="flex">
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
                  {post.image && (
                    <img
                      src={`http://localhost:5000/uploads/${post.image}`}
                      alt="Post"
                      className="w-full h-64 object-cover mb-4 rounded-lg"
                    />
                  )}
                  <h2 className="text-xl font-bold text-[#3E2723] mb-2 font-serif">{post.title}</h2>
                  <p className="text-[#3E2723]/80 mb-4 font-serif">{post.content}</p>
                  <div className="flex items-center justify-between text-[#3E2723]/60">
                    <span className="font-serif">Posted by u/{post.author}</span>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1" onClick={() => handleLike(post._id)}>
                        <ThumbsUp size={18} />
                        {post.upvotes}
                      </button>
                      <button className="flex items-center gap-1" onClick={() => toggleComments(post._id)}>
                        <MessageCircle size={18} />
                        {post.comments.length}
                      </button>
                      {/* <button>
                        <Share2 size={18} />
                      </button> */}
                    </div>
                  </div>

                  {showCommentsForPost === post._id && (
                    <div className="mt-4">
                      <div className="space-y-2">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-[#3E2723]">{comment.content}</p>
                            <span className="text-sm text-[#3E2723]/60">- {comment.author}</span>
                          </div>
                        ))}
                      </div>

                      {commentingPostId === post._id ? (
                        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={4}
                            className="w-full p-2 rounded-lg border border-gray-300 mb-4"
                            placeholder="Write your comment..."
                          />
                          <div className="flex justify-end gap-4">
                            <button
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                              onClick={() => setCommentingPostId(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-[#5E412F] text-white px-4 py-2 rounded-lg hover:bg-[#6D4C41]"
                              onClick={handleAddComment}
                            >
                              Post Comment
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="mt-4 text-[#5E412F] hover:text-[#6D4C41] font-bold"
                          onClick={() => setCommentingPostId(post._id)}
                        >
                          Write a comment
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
