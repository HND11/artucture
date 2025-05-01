// src/components/Footer.jsx
// ACTUALIZADO: Logo de fondo alineado abajo y datos de contacto actualizados

import React from 'react';
// Asegúrate de importar tu componente Logo
import { Logo } from './Logo'; // Ajusta la ruta si es necesario

// --- Colores Calculados (Basados en fondo --secondary) ---
const footerTextColorStyle = 'color-mix(in srgb, var(--text), transparent 30%)';
const footerTextColorClass = `text-[${footerTextColorStyle}]`;
const footerHoverTextColorClass = 'hover:text-[var(--accent)]'; // Hover solo cambia texto a accent
const footerBorderColorClass = 'border-[color:color-mix(in_srgb,var(--text),transparent_80%)]';
const backgroundLogoColorClass = 'text-[var(--text)] opacity-10';


// Asumiendo que tienes un componente Icono o un SVG inline
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);


function Footer() {
  return (
    <footer
      className={`
        relative // Necesario para posicionar el logo absoluto
        mt-24 md:mt-32
        mx-4 md:mx-8 lg:mx-16
        mb-8
        rounded-2xl
        shadow-lg
        overflow-hidden
        px-6 sm:px-10 md:px-20
        py-16 md:py-20
        bg-[var(--secondary)]
        ${footerTextColorClass}
      `}
    >
      {/* Contenido principal del Footer (columnas) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
         {/* Columna 1 */}
         <div className="space-y-4">
           <h3 className="text-lg font-semibold text-[var(--text)]">Artucture</h3>
           <p className="text-sm">
             Diseñando sueños y construyendo hogares. {/* Eslogan actualizado */}
           </p>
         </div>
         {/* Columna 2 */}
         <div className="space-y-4">
           <h3 className="text-lg font-semibold text-[var(--text)]">Explora</h3>
           <ul className="space-y-2 text-sm">
             <li><a href="/" className={`${footerHoverTextColorClass} transition-colors duration-200`}>Inicio</a></li>
             <li><a href="/about" className={`${footerHoverTextColorClass} transition-colors duration-200`}>Sobre Nosotros</a></li>
             <li><a href="/projects" className={`${footerHoverTextColorClass} transition-colors duration-200`}>Proyectos</a></li>
           </ul>
         </div>
         {/* Columna 3 */}
         <div className="space-y-4">
           <h3 className="text-lg font-semibold text-[var(--text)]">Contacto</h3>
           <p className="text-sm">
             <a href="mailto:contacto@artucture.com" className={`${footerHoverTextColorClass} transition-colors duration-200`}>contacto@artucture.com</a> {/* Email actualizado */}
           </p>
           <p className="text-sm">
             <a href="tel:+18298792507" className={`${footerHoverTextColorClass} transition-colors duration-200`}>+1 (829)-879-2507</a> {/* Teléfono actualizado */}
           </p>
         </div>
         {/* Columna 4 */}
         <div className="space-y-4">
           <h3 className="text-lg font-semibold text-[var(--text)]">Síguenos</h3>
           <div className="flex space-x-4">
             {/* Asumiendo una URL de Instagram, si no, quitar o dejar como placeholder */}
             <a
               href="https://www.instagram.com/artucture/" // Reemplazar con la URL real
               target="_blank"
               rel="noopener noreferrer"
               aria-label="Instagram de Artucture"
               className={`${footerHoverTextColorClass} transition-colors duration-200`}
             >
               <InstagramIcon />
             </a>
           </div>
         </div>
      </div> {/* Fin del Grid */}

      {/* Sección Inferior: Copyright y Privacidad */}
      <div
        className={`
          relative z-10 // Asegura que esté sobre el logo
          pt-8 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0
        `}
      >
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Artucture SRL. Todos los derechos reservados. {/* Añadido SRL */}
        </p>
        <span className="hidden md:block"></span>
      </div>

      {/* --- Logo Grande de Fondo (Ajustado) --- */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none overflow-hidden">
         <Logo className={`w-auto h-40 ${backgroundLogoColorClass}`} />
      </div>
      {/* --- FIN: Logo Grande de Fondo --- */}

    </footer>
  );
}

export default Footer;