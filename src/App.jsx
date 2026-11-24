import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import HomePage from './pages/homepage';
import DetailsPage from './pages/detailspage';
import FavoritesPage from './pages/favoritespage';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </>
  );
}