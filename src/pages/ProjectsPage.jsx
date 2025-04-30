// src/pages/ProjectsPage.jsx
// ACTUALIZADO: Se deshabilita la animación de salida de página al hacer clic en imagen

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
// --- CORREGIDO ---
import { projectList } from '../data/ProjectData.js'; // Corrected path and casing
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
// Using color-mix for secondary text color
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
  const [imagesLoaded, setImagesLoaded] = useState(false); // State to track initial image loads
  const [isExitingViaImageClick, setIsExitingViaImageClick] = useState(false); // Estado para controlar salida
  const imageRefs = useRef([]); // Ref to store image elements for getting bounding rect

   // --- Lógica de Navegación y Expansión ---
   const handleImageClick = useCallback((index, imageElement) => {
    // Ensure projectList exists and index is valid
    if (expandedIndex !== null || !imageElement || !projectList || index < 0 || index >= projectList.length) return;

    setIsExitingViaImageClick(true); // Marcar salida por clic en imagen

    const projectToNavigate = projectList[index];
    const projectId = projectToNavigate.id;
    const rect = imageElement.getBoundingClientRect();
    const currentOriginalImageRect = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };

    const processImageExpand = () => {
        disableScroll(); // Disable scroll during animation
        setOriginalImageRect(currentOriginalImageRect);
        setExpandedIndex(index);
        const pageTarget = `/project/${projectId}`;
        // Retrasar navegación para permitir animación del clon
        setTimeout(() => {
            // Pass image source and origin rect in state for potential shared element transition
            navigate(pageTarget, { state: { imageSrc: getImageUrl(projectToNavigate.image || projectToNavigate.thumbnail), originRect: currentOriginalImageRect } });
        }, 600); // Duration should match animation
    };

    // Scroll to top before expanding if not already there
    if (window.scrollY > 10) {
       scrollToTop(processImageExpand);
    } else {
       processImageExpand();
    }

  }, [expandedIndex, navigate, disableScroll]); // Dependencies for the callback


  // Efecto para precargar imágenes (first few) y limpiar scroll on unmount
  useEffect(() => {
    const preloadImages = () => {
      // Ensure projectList is available
      if (!projectList) return;
      // Preload first 4 images for faster initial display
      const imagesToPreload = projectList.slice(0, 4).map(project =>
        getImageUrl(project.image || project.thumbnail) // Use main image or thumbnail
      );

      const imagePromises = imagesToPreload.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = () => resolve(); // Resolve even if one fails to not block loading state
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true)) // Set loaded state after promises resolve
        .catch(() => setImagesLoaded(true)); // Still set loaded even if errors occur
    };

    preloadImages();
    window.scrollTo(0, 0); // Scroll to top on mount

    // Cleanup function to re-enable scroll when component unmounts
    return () => {
      enableScroll();
    };
  }, [enableScroll]); // Dependency: enableScroll function

  // Effect to manage image refs array size based on projectList length
  useEffect(() => {
    if (projectList) {
        imageRefs.current = imageRefs.current.slice(0, projectList.length);
    } else {
        imageRefs.current = [];
    }
  }, []); // Run only on mount

  // Function to assign refs to image elements
  const assignRef = (el, index) => {
    imageRefs.current[index] = el;
  };

  // Ensure projectList is loaded before rendering the grid
  if (!projectList) {
    // Optional: Render a loading state or null
    return <div className="min-h-screen bg-[var(--background)]">Loading...</div>;
  }

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
        className="pt-32 pb-16 md:pt-48 md:pb-24 bg-[var(--secondary)]/50" // Semi-transparent secondary background
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
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24 lg:gap-y-32 items-start">
          {/* Mobile/Single Column View (Render all cards) */}
          {projectList.map((project, index) => (
            <motion.div
              key={`${project.id}-mobile`}
              className="w-full block md:hidden" // Show only on mobile/tablet
              variants={cardVariants}
              initial="hidden"
              // Animate first few cards immediately, others on scroll
              animate={index < 2 ? "visible" : undefined}
              whileInView={index >= 2 ? "visible" : undefined}
              viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% visible
            >
              <ProjectCard
                project={project}
                index={index}
                getImageUrl={getImageUrl}
                onClick={handleImageClick} // Pass the click handler
                assignRef={assignRef} // Pass ref assignment function
                hoverTransition={hoverTransition}
                forceLoad={index < 2} // Eager load first few images
              />
            </motion.div>
          ))}

          {/* Desktop/Two-Column View */}
          {/* Column 1 (Even indices) */}
          <div className="hidden md:flex flex-col space-y-16 md:space-y-24 lg:space-y-32">
            {projectList.filter((_, index) => index % 2 === 0).map((project, columnIndex) => {
                // Find the original index in the full projectList
                const originalIndex = projectList.findIndex(p => p.id === project.id);
                return (
                  <motion.div
                    key={`${project.id}-col1`}
                    className="w-full"
                    variants={cardVariants}
                    initial="hidden"
                    // Animate first card in column immediately
                    animate={columnIndex === 0 ? "visible" : undefined}
                    whileInView={columnIndex > 0 ? "visible" : undefined}
                    viewport={{ once: true, amount: 0.15 }} // Trigger when 15% visible
                  >
                    <ProjectCard
                      project={project}
                      index={originalIndex} // Use original index for click handler
                      getImageUrl={getImageUrl}
                      onClick={handleImageClick}
                      assignRef={assignRef}
                      hoverTransition={hoverTransition}
                      forceLoad={columnIndex === 0} // Eager load first image in column
                    />
                  </motion.div>
                );
            })}
          </div>
          {/* Column 2 (Odd indices) */}
          <div className="hidden md:flex flex-col space-y-16 md:space-y-24 lg:space-y-32 md:mt-16 lg:mt-24"> {/* Add top margin to stagger */}
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
                      onClick={handleImageClick}
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

       {/* Clon para Animación (Shared Element Transition) */}
       <AnimatePresence>
          {expandedIndex !== null && originalImageRect && projectList[expandedIndex] && (
              <motion.div
                className="fixed z-[60] pointer-events-none bg-[var(--background)] origin-top" // High z-index, covers page
                initial={{ // Start from original image position
                  left: originalImageRect.x,
                  top: originalImageRect.y,
                  width: originalImageRect.width,
                  height: originalImageRect.height,
                  borderRadius: '8px', // Match card border radius initially
                }}
                animate={{ // Animate to full screen
                  left: 0,
                  top: 0,
                  width: '100vw',
                  height: '100vh',
                  borderRadius: '0px', // Become square
                  transition: {
                    duration: 0.6, // Animation duration
                    ease: [0.16, 1, 0.3, 1] // Custom easing
                  }
                }}
              >
                {/* Image inside the expanding div */}
                <motion.img
                  // Use image or thumbnail for source
                  src={getImageUrl(projectList[expandedIndex].image || projectList[expandedIndex].thumbnail)}
                  alt="Expanding project"
                  className="w-full h-full object-cover object-top" // Cover the div
                  initial={{ scale: 1 }} // Start at normal scale
                  animate={{
                    scale: 1, // Maintain scale (can adjust if needed)
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
  const cardRef = useRef(null); // Ref for the image div itself
  const [imageLoaded, setImageLoaded] = useState(forceLoad); // State for image loading status

  // Combined ref assignment function
  const setRefs = (el) => {
    cardRef.current = el; // Assign to cardRef for click handler
    assignRef(el, index); // Assign to parent's ref array
  };

  // Preload image effect (only if forceLoad is true and not already loaded)
  useEffect(() => {
    if (forceLoad && !imageLoaded) {
      const img = new Image();
      img.src = getImageUrl(project.image || project.thumbnail);
      img.onload = () => setImageLoaded(true);
      // Optional: handle error
      // img.onerror = () => console.error("Failed to preload image:", img.src);
    }
  }, [forceLoad, imageLoaded, project, getImageUrl]); // Dependencies

  return (
    // Click handler on the outer div, passes index and the image element ref
    <div className="block group cursor-pointer" onClick={() => cardRef.current && onClick(index, cardRef.current)}>
      {/* Motion div for the image container */}
      <motion.div
        ref={setRefs} // Assign refs here
        className="overflow-hidden rounded-4xl shadow-lg group-hover:shadow-2xl mb-4 md:mb-6 aspect-square relative"
        whileHover={{ scale: 0.97 }} // Shrink container slightly on hover
        transition={hoverTransition}
      >
        {/* Motion image */}
        <motion.img
          src={getImageUrl(project.image || project.thumbnail)}
          alt={project.title}
          // Fade in image when loaded
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)} // Set loaded state on load
          whileHover={{ scale: 1.05 }} // Zoom image slightly on hover
          transition={hoverTransition}
          loading={forceLoad ? "eager" : "lazy"} // Eager load first few, lazy load others
        />
        {/* Placeholder while image is loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200/50 animate-pulse"></div>
        )}
      </motion.div>
      {/* Text content below the image */}
      <div className="p-2">
        <h3 className={`text-base ${secondaryTextColorClass} uppercase tracking-wider mb-1`}>{project.projectName}</h3>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text)] leading-tight">{project.title}</h2>
      </div>
    </div>
  );
}

export default ProjectsPage;