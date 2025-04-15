import React from 'react';
import { Home, Users, BookOpen, Linkedin } from 'lucide-react';
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
import axios from 'axios';

const About = () => {
  const developers = [
    {
      name: "Krushna Harde",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/krushna-harde",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Dhruv Dixit",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/dhruv-dixit",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Riya Joshi",
      role: "Backend Developer",
      linkedin: "https://www.linkedin.com/in/riya-joshi",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Omkar Gadage",
      role: "UI/UX Designer, Fronted Developer",
      linkedin: "https://www.linkedin.com/in/omkar-gadage",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  return (
    <div className="flex min-h-screen bg-amber-50">
      {/* Left Sidebar */}
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
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <h1 className="text-3xl font-serif text-amber-900 mb-6">About LitVerse</h1>
              
              <section className="mb-12">
                <h2 className="text-2xl font-serif text-amber-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  LitVerse is a vibrant literary community platform designed to connect readers, writers, and book enthusiasts from around the world. Our mission is to create a space where literature comes alive through meaningful discussions, creative writing, and shared experiences.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We believe in the power of stories to inspire, educate, and transform lives. Through our platform, we aim to make literature more accessible, engaging, and interactive for everyone.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-serif text-amber-800 mb-4">Our Community</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The LitVerse community is made up of passionate readers, aspiring writers, established authors, and literary enthusiasts. We foster an environment of mutual respect, creativity, and intellectual growth through:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Book discussions and reading circles</li>
                  <li>Writing workshops and feedback sessions</li>
                  <li>Literary events and author interviews</li>
                  <li>Creative writing challenges and prompts</li>
                  <li>Genre-specific discussion groups</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-amber-800 mb-6">Development Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {developers.map((dev) => (

                    <div key={dev.name} className="bg-amber-50 rounded-lg p-6 flex items-center space-x-4">
                      <img
                        src={dev.image}
                        alt={dev.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-serif text-amber-900">{dev.name}</h3>
                        <p className="text-gray-600">{dev.role}</p>
                        <a
                          href={dev.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-amber-700 hover:text-amber-600 mt-2"
                        >
                          <Linkedin size={16} />
                          <span>LinkedIn Profile</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;