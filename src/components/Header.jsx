// src/components/Header.jsx
// ACTUALIZADO para usar las nuevas variables CSS (--text, --background)

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
// Asumiendo que Logo usa 'currentColor' o acepta una clase para el color
import { Logo } from './Logo';

// --- Colores Calculados (Basados en nuevas variables) ---
const headerClosedBg = 'color-mix(in srgb, var(--text), transparent 95%)'; // Fondo cerrado: --text muy transparente
const headerOpenBg = 'color-mix(in srgb, var(--text), transparent 5%)';   // Fondo abierto: --text casi opaco
const iconColorClosed = 'text-[var(--text)]';                             // Icono cerrado: --text
const iconColorOpen = 'text-[var(--background)]';                         // Icono abierto: --background
const linkColorOpen = 'text-[var(--background)]';                         // Links abiertos: --background
const linkHoverBgOpen = 'hover:bg-[color:color-mix(in_srgb,var(--background),transparent_95%)]'; // Hover links abiertos: --background muy transparente

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor" // Hereda color del padre (botón)
    strokeLinecap="round"
    {...props}
  />
);

const AnimatedMenuIcon = ({ isOpen, toggle, colorClass }) => ( // Recibe clase de color
  <motion.button
    onClick={toggle}
    initial={false}
    animate={isOpen ? "open" : "closed"}
    // Aplica la clase de color directamente
    className={`focus:outline-none relative z-50 w-6 h-6 flex items-center justify-center ${colorClass}`}
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <svg width="20" height="20" viewBox="0 0 20 20">
      {/* Las variantes de path no cambian */}
      <Path variants={{ closed: { d: "M 2 3 L 18 3" }, open: { d: "M 3 17 L 17 3" } }} transition={{ duration: 0.3 }} />
      <Path variants={{ closed: { d: "M 2 17 L 18 17" }, open: { d: "M 3 3 L 17 17" } }} transition={{ duration: 0.3 }} />
    </svg>
  </motion.button>
);

// --- Componente Link Simple Animado (Actualizado con hover de texto) ---
const SimpleNavLink = ({ item, onClick, isOpen }) => {
  // Clase para el color del texto en hover, solo si el menú está abierto
  const hoverTextColorClass = isOpen ? 'hover:text-[var(--accent)]' : ''; // Cambia a --accent en hover

  return (
      <Link
          to={item.path}
          className={`
              block text-center py-1.5 px-4 text-base font-medium rounded-md
              transition-colors duration-300 // Transición suave para color y fondo
              ${isOpen ? linkColorOpen : iconColorClosed} // Color base del texto (--background o --text)
              ${isOpen ? linkHoverBgOpen : ''} // Fondo en hover cuando está abierto
              ${hoverTextColorClass} // Color del texto en hover cuando está abierto
          `}
          onClick={onClick}
      >
          {item.name}
      </Link>
  );
};

// --- Variantes para la Isla Principal (Actualizadas con colores calculados) ---
const islandVariants = {
  closed: {
    backgroundColor: headerClosedBg,
    backdropFilter: 'blur(8px)', // Mantener blur
    WebkitBackdropFilter: 'blur(8px)', // Safari
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)', // Sombra sutil
    height: "56px",
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], height: { delay: 0.2, duration: 0.3 } }
  },
  open: {
    backgroundColor: headerOpenBg,
    backdropFilter: 'blur(16px)', // Aumentar blur al abrir
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Sombra más pronunciada
    height: "auto",
    transition: { duration: 0.4, ease: "easeInOut", height: { duration: 0.4 } }
  }
};

// --- Variantes para la aparición/desaparición de los links (Actualizadas con colores) ---
const listVariants = {
  open: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  closed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.4, when: "afterChildren" } }
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    color: 'var(--background)', // Usa variable directamente para JS/Framer
    transition: { type: "spring", stiffness: 300, damping: 20, color: { duration: 0.3 } }
  },
  closed: {
    y: -10,
    opacity: 0,
    color: 'var(--text)', // Usa variable directamente para JS/Framer
    transition: { duration: 0.3, ease: "easeInOut", color: { duration: 0.2, ease: "linear" } }
  }
};

// --- Componente Header Principal (Actualizado) ---
const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const location = useLocation();

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Sobre nosotros", path: "/about" },
    { name: "Proyectos", path: "/projects" },
  ];

  useEffect(() => {
    if (isOpen) toggleOpen(0); // Cierra el menú al cambiar de ruta (toggleOpen(0) fuerza a false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLinkClick = () => {
    if (isOpen) toggleOpen(0); // Cierra el menú al hacer clic en un enlace
  }

  // Determina la clase de color actual para el icono y el logo
  const currentIconColorClass = isOpen ? iconColorOpen : iconColorClosed;

  return (
    <div className="fixed top-0 left-0 right-0 m-5 z-50 flex justify-center pointer-events-none">
        {/* La Isla Expansible */}
        <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={islandVariants}
            // Aplica estilos directamente que no están en variantes (si es necesario)
            className={`
                relative pointer-events-auto
                w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3
                overflow-hidden
                rounded-3xl
            `}
            // Aplica los estilos de fondo directamente aquí para que Framer los anime
            style={{
                backgroundColor: isOpen ? headerOpenBg : headerClosedBg,
                backdropFilter: isOpen ? 'blur(16px)' : 'blur(8px)',
                WebkitBackdropFilter: isOpen ? 'blur(16px)' : 'blur(8px)', // Para Safari
            }}
        >
            {/* Contenido Superior Fijo */}
            <div className="flex items-center justify-between h-14 flex-shrink-0 px-4 relative z-10">
                {/* Izquierda: Botón Menú */}
                <div className="flex-1 flex justify-start flex-shrink-0">
                    {/* Pasa la clase de color dinámica */}
                    <AnimatedMenuIcon isOpen={isOpen} toggle={toggleOpen} colorClass={currentIconColorClass} />
                </div>

                {/* Centro: Logo */}
                <div className="flex-1 flex justify-center flex-shrink-0">
                    <Link to="/" onClick={handleLinkClick}>
                        {/* Asegúrate que Logo acepte className y usa currentColor o la clase dinámica */}
                        <Logo className={`h-8 w-auto ${currentIconColorClass}`} />
                    </Link>
                </div>

                {/* Derecha: Espacio vacío */}
                <div className="flex-1 flex justify-end flex-shrink-0">
                    <div className="w-6 h-6"></div> {/* Mantiene el balance visual */}
                </div>
            </div>

            {/* Contenedor Animado para los Links */}
            <AnimatePresence mode="sync">
                {isOpen && (
                    <motion.div
                        key="nav-links-container"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={listVariants}
                        className="flex flex-col items-center space-y-1 pb-4 px-4"
                    >
                        {navLinks.map((item) => (
                            <motion.div
                                key={item.path}
                                variants={itemVariants} // Aplica variantes a cada item
                                className="w-full"
                            >
                                <SimpleNavLink
                                    item={item}
                                    onClick={handleLinkClick}
                                    isOpen={isOpen}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div> {/* Fin Isla */}
    </div> // Fin Contenedor Fijo
  );
};

export default Header;