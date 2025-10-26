import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignIn from './components/SignIn';

const App = () => {
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path="/signup" element={<SignIn />} />
  </Routes>
}

export default App;

