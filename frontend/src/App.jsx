import React, { useState } from 'react';
import LoginPage from '../src/pages/LoginPage.jsx';
import './App.css';

function App() {

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };



  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
