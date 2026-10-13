import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CarsListPage from './pages/CarsListPage';
import CarDetailPage from './pages/CarDetailPage';
import ComparePage from './pages/ComparePage';
import ContactPage from './pages/ContactPage';
import UiElementsPage from './pages/UiElementsPage';
import EmbedPage from './pages/ui-elements/EmbedPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsListPage />} />
        <Route path="/cars/:id" element={<CarDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ui-elements/*" element={<UiElementsPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
      {/* Bare documents with no site chrome, used as iframe sources by the Frames examples. */}
      <Route path="/embed/:name" element={<EmbedPage />} />
    </Routes>
  );
}
