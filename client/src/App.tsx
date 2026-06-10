import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormBuilderPage from './pages/FormBuilderPage';
import FormFillerPage from './pages/FormFillerPage';
import FormResponsesPage from './pages/FormResponsesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forms/new" element={<FormBuilderPage />} />
          <Route path="/forms/:id/fill" element={<FormFillerPage />} />
          <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
