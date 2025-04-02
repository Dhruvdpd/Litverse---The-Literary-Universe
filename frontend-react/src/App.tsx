import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookExplore from './pages/BookExplore';
import BookDetails from './pages/BookDetails';
import MyBooks from './pages/MyBooks';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookexplore" element={<BookExplore />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;