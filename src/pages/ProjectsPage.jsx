// src/pages/ProjectsPage.jsx
// ACTUALIZADO: Se deshabilita la animación de salida de página al hacer clic en imagen

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { projectList } from '../data/projectData';
import Footer from '../components/Footer';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useDisableBodyScroll from '../hooks/useDisableBodyScroll';

// --- Variantes de Transición de Página Suaves ---
const pageTransitionVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  },
  exit: { // Animación de salida normal
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  noExit: { // Salida instantánea cuando se hace clic en imagen
    opacity: 0,
    y: 0,
    transition: { duration: 0 }
  }
};

// --- Componente Placeholder TextFeatureSection ---
const secondaryTextColorClass = "text-[color:color-mix(in_srgb,_var(--text),_transparent_30%)]";

// --- Variantes de Animación (Otras) ---
const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }};
const hoverTransition = { duration: 0.4, ease: "easeInOut" };

// --- Helper URL ---
const base = import.meta.env.BASE_URL || '/';
const placeholderBg = '#0a0f19';
const placeholderText = '#f1f1ee';
const getImageUrl = (path, placeholder = `https://placehold.co/600x600/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Project`) => {
  if (!path) return placeholder;
  const imagePath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}${imagePath}`;
};

// --- Funciones Auxiliares de Animación y Scroll ---
const easeTo = (start, end, duration, onUpdate, onComplete) => {
    const startTime = performance.now();
    const animateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentValue = start + (end - start) * easedProgress;
      onUpdate(currentValue, easedProgress);
      if (progress < 1) { requestAnimationFrame(animateStep); }
      else { onComplete?.(); }
    };
    requestAnimationFrame(animateStep);
};

const scrollToTop = (callback) => {
    const scrollTop = window.scrollY;
    if (scrollTop <= 0) { callback?.(); return; }
    const duration = Math.min(800, Math.max(400, scrollTop * 0.8));
    easeTo( scrollTop, 0, duration, (current) => { window.scrollTo(0, current); }, callback );
};

function ProjectsPage() {
  useSmoothScroll(true, 0.06);
  const navigate = useNavigate();
  const { disableScroll, enableScroll } = useDisableBodyScroll();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [originalImageRect, setOriginalImageRect] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isExitingViaImageClick, setIsExitingViaImageClick] = useState(false); // Estado para controlar salida
  const imageRefs = useRef([]);

   // --- Lógica de Navegación y Expansión ---
   const handleImageClick = useCallback((index, imageElement) => {
    if (expandedIndex !== null || !imageElement || !projectList[index]) return;

    setIsExitingViaImageClick(true); // Marcar salida por clic en imagen

    const projectToNavigate = projectList[index];
    const projectId = projectToNavigate.id;
    const rect = imageElement.getBoundingClientRect();
    const currentOriginalImageRect = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };

    const processImageExpand = () => {
        disableScroll();
        setOriginalImageRect(currentOriginalImageRect);
        setExpandedIndex(index);
        const pageTarget = `/project/${projectId}`;
        // Retrasar navegación para permitir animación del clon
        setTimeout(() => {
            navigate(pageTarget, { state: { imageSrc: getImageUrl(projectToNavigate.image || projectToNavigate.thumbnail), originRect: currentOriginalImageRect } });
        }, 600);
    };

    if (window.scrollY > 10) {
       scrollToTop(processImageExpand);
    } else {
       processImageExpand();
    }

  }, [expandedIndex, navigate, disableScroll]);


  // Efecto para precargar imágenes y limpiar scroll
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = projectList.slice(0, 4).map(project =>
        getImageUrl(project.image || project.thumbnail)
      );

      const imagePromises = imagesToPreload.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject; // Considerar manejo de error
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch(() => setImagesLoaded(true)); // Continuar aunque fallen algunas
    };

    preloadImages();
    window.scrollTo(0, 0);

    return () => {
      enableScroll();
    };
  }, [enableScroll]);

  // Efecto para manejar refs de imagen
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, projectList.length);
  }, []);

  const assignRef = (el, index) => {
    imageRefs.current[index] = el;
  };

  return (
    <motion.div
      key="projects-page"
      initial="hidden"
      animate="visible"
      exit={isExitingViaImageClick ? "noExit" : "exit"} // EXIT CONDICIONAL
      variants={pageTransitionVariants}
      className="min-h-screen font-sans antialiased bg-[var(--background)] text-[var(--text)]"
    >
      <Header />

      {/* Hero Section */}
      <motion.div
        className="pt-32 pb-16 md:pt-48 md:pb-24 bg-[var(--secondary)]/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 sm:px-10 md:px-20 text-center">
          <h1 className={`text-5xl md:text-7xl text-[var(--text)] font-bold leading-tight`}>Nuestros Proyectos</h1>
          <p className={`text-lg md:text-xl ${secondaryTextColorClass} mt-4 tracking-wide`}>Explora una selección de nuestros trabajos más destacados.</p>
        </div>
      </motion.div>

      {/* Projects Grid Section */}
      <section className="container mx-auto px-6 sm:px-10 md:px-20 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24 lg:gap-y-32 items-start">
          {/* Mobile/Single Column View */}
          {projectList.map((project, index) => (
            <motion.div
              key={`${project.id}-mobile`}
              className="w-full block md:hidden"
              variants={cardVariants}
              initial="hidden"
              animate={index < 2 ? "visible" : undefined}
              whileInView={index >= 2 ? "visible" : undefined}
              viewport={{ once: true, amount: 0.1 }}
            >
              <ProjectCard
                project={project}
                index={index}
                getImageUrl={getImageUrl}
                onClick={handleImageClick} // Pasa la función actualizada
                assignRef={assignRef}
                hoverTransition={hoverTransition}
                forceLoad={index < 2}
              />
            </motion.div>
          ))}

          {/* Desktop/Two-Column View */}
          {/* Column 1 */}
          <div className="hidden md:flex flex-col space-y-16 md:space-y-24 lg:space-y-32">
            {projectList.filter((_, index) => index % 2 === 0).map((project, columnIndex) => {
                const originalIndex = projectList.findIndex(p => p.id === project.id);
                return (
                  <motion.div
                    key={`${project.id}-col1`}
                    className="w-full"
                    variants={cardVariants}
                    initial="hidden"
                    animate={columnIndex === 0 ? "visible" : undefined}
                    whileInView={columnIndex > 0 ? "visible" : undefined}
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <ProjectCard
                      project={project}
                      index={originalIndex}
                      getImageUrl={getImageUrl}
                      onClick={handleImageClick} // Pasa la función actualizada
                      assignRef={assignRef}
                      hoverTransition={hoverTransition}
                      forceLoad={columnIndex === 0}
                    />
                  </motion.div>
                );
            })}
          </div>
          {/* Column 2 */}
          <div className="hidden md:flex flex-col space-y-16 md:space-y-24 lg:space-y-32 md:mt-16 lg:mt-24">
            {projectList.filter((_, index) => index % 2 !== 0).map((project, columnIndex) => {
                const originalIndex = projectList.findIndex(p => p.id === project.id);
                return (
                  <motion.div
                    key={`${project.id}-col2`}
                    className="w-full"
                    variants={cardVariants}
                    initial="hidden"
                    animate={columnIndex === 0 ? "visible" : undefined}
                    whileInView={columnIndex > 0 ? "visible" : undefined}
                    viewport={{ once: true, amount: 0.15 }}
                  >
                    <ProjectCard
                      project={project}
                      index={originalIndex}
                      getImageUrl={getImageUrl}
                      onClick={handleImageClick} // Pasa la función actualizada
                      assignRef={assignRef}
                      hoverTransition={hoverTransition}
                      forceLoad={columnIndex === 0}
                    />
                  </motion.div>
                );
            })}
          </div>
        </div>
      </section>

      <Footer />

       {/* Clon para Animación */}
       <AnimatePresence>
          {expandedIndex !== null && originalImageRect && projectList[expandedIndex] && (
              <motion.div
                className="fixed z-[60] pointer-events-none bg-[var(--background)] origin-top"
                initial={{
                  left: originalImageRect.x,
                  top: originalImageRect.y,
                  width: originalImageRect.width,
                  height: originalImageRect.height,
                  borderRadius: '8px',
                }}
                animate={{
                  left: 0,
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                  borderRadius: '0px',
                  transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
              >
                <motion.img
                  src={getImageUrl(projectList[expandedIndex].image || projectList[expandedIndex].thumbnail)}
                  alt="Expanding project"
                  className="w-full h-full object-cover object-top"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                />
              </motion.div>
          )}
      </AnimatePresence>

    </motion.div>
  );
}

// --- Componente ProjectCard ---
function ProjectCard({ project, index, getImageUrl, onClick, assignRef, hoverTransition, forceLoad }) {
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(forceLoad);
  const setRefs = (el) => { cardRef.current = el; assignRef(el, index); };

  // Preload image
  useEffect(() => {
    if (forceLoad && !imageLoaded) {
      const img = new Image();
      img.src = getImageUrl(project.image || project.thumbnail);
      img.onload = () => setImageLoaded(true);
    }
  }, [forceLoad, imageLoaded, project, getImageUrl]);

  return (
    <div className="block group cursor-pointer" onClick={() => cardRef.current && onClick(index, cardRef.current)}> {/* Llama al onClick pasado */}
      <motion.div
        ref={setRefs}
        className="overflow-hidden rounded-4xl shadow-lg group-hover:shadow-2xl mb-4 md:mb-6 aspect-square relative"
        whileHover={{ scale: 0.97 }}
        transition={hoverTransition}
      >
        <motion.img
          src={getImageUrl(project.image || project.thumbnail)}
          alt={project.title}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          whileHover={{ scale: 1.05 }}
          transition={hoverTransition}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div> // Placeholder
        )}
      </motion.div>
      <div className="p-2">
        <h3 className={`text-base ${secondaryTextColorClass} uppercase tracking-wider mb-1`}>{project.projectName}</h3>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text)] leading-tight">{project.title}</h2>
      </div>
    </div>
  );
}

export default ProjectsPage;