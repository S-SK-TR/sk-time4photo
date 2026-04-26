import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/timeline/:id' element={<Timeline />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;