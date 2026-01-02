import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { ActorPage } from './pages/ActorPage';
import { DirectorPage } from './pages/DirectorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:id" element={<MovieDetailPage />} />
        <Route path="actors/:id" element={<ActorPage />} />
        <Route path="directors/:id" element={<DirectorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
