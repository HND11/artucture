// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Intenta hacer scroll al inicio de varias maneras para asegurar compatibilidad
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch (e) {
      window.scrollTo(0, 0); // Fallback
    }

    // Un intento adicional por si el renderizado tarda
    const timer = setTimeout(() => {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        } catch (e) {
          window.scrollTo(0, 0);
        }
    }, 50); // 50ms delay

    return () => clearTimeout(timer); // Limpia el timeout al desmontar

  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null; // No renderiza nada
}

export default ScrollToTop;
