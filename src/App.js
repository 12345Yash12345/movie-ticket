// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './ShowList';
import ShowSummary from './ShowSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
