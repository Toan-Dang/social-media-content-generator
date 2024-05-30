import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import { GlobalStateProvider } from './context/GlobalState';

const App = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<AuthForm />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;