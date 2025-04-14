import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Community from './Community';
import Post from './Post';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import ComPosts from './ComPosts';
import BookDetailsPage from './pages/BookDetails';
import BookExplore from './pages/BookExplore';
import MyBooks from './pages/MyBooks';
import WelcomeAnimation from './pages/WelcomeAnimation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/welcome" element={<WelcomeAnimation />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
          <Route path="/bookexplore" element={<BookExplore />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/my-books" element={<MyBooks />} />
        
        <Route 
          path="/community" 
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          } 
        />
                <Route path="/community/:topic" element={<ComPosts />} /> {/* ✅ Dynamic route */}

        <Route 
          path="/post" 
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;