// src/App.jsx

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Importa las páginas
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ImageDetailPage from './pages/ImageDetailPage';

// Importa el nuevo componente
import ScrollToTop from './components/ScrollToTop'; // <-- Importa ScrollToTop

function App() {
  const location = useLocation();

  return (
    <> {/* Usa un Fragment <>...</> para envolver ScrollToTop y AnimatePresence */}
      <ScrollToTop /> {/* <-- Añade el componente aquí */}
      <AnimatePresence mode="wait">
        {/* key={location.pathname} es importante */}
        <Routes location={location} key={location.pathname}>
          {/* Rutas Principales */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Ruta dinámica ÚNICA para todas las páginas de detalle */}
          <Route path="/project/:pageId" element={<ImageDetailPage />} />

          {/* Fallback opcional */}
          {/* <Route path="*" element={<div>404 - Not Found</div>} /> */}

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

    