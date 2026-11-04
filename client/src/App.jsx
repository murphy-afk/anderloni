import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Artista from './pages/Artista.jsx';
import Opere from './pages/Opere.jsx';
import Serie from './pages/Serie.jsx';
import Opera from './pages/Opera.jsx';
import Testi from './pages/Testi.jsx';
import Testo from './pages/Testo.jsx';
import Contatti from './pages/Contatti.jsx';
import NoteLegali from './pages/NoteLegali.jsx';
import Privacy from './pages/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';

// BASE_URL is "/" locally and "/anderloni/" on GitHub Pages, so the same
// routes resolve in both environments.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '');

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/artista" element={<Artista />} />
          <Route path="/opere" element={<Opere />} />
          <Route path="/opere/:serie" element={<Serie />} />
          <Route path="/opere/:serie/:opera" element={<Opera />} />
          <Route path="/testi" element={<Testi />} />
          <Route path="/testi/:testo" element={<Testo />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/note-legali" element={<NoteLegali />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}