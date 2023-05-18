import { Routes, Route } from 'react-router-dom';

import { FavouritesPage, HomePage } from './pages';
import { Navigation } from './components';

import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
}

export default App;
