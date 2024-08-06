import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Data from './Data';
import UserProfile from './UserProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Data />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
