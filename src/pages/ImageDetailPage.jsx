// src/pages/New_ImageDetailPage_v3.4.jsx
// Based on v3.3, with refinements:
// - Unique Text animation logic confirmed present.
// - Removed explicit loading state return for smoother page transitions.
// - Content sections depending on projectData are now conditionally rendered.

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
// --- CORREGIDO ---
import { pageData } from '../data/ProjectData.js'; // Corrected path and casing
import Footer from '../components/Footer';
import useSmoothScroll from '../hooks/useSmoothScroll';

// --- Helper para URL ---
const base = import.meta.env.BASE_URL || '/';
const placeholderBg = '#0a0f19';
const placeholderText = '#f1f1ee';
const getImageUrl = (path, size = 'large', placeholder = `https://placehold.co/1600x900/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Project+Image`) => {
  if (!path) return placeholder;
  const imagePath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}${imagePath}`;
};

// --- Colores Comunes ---
const secondaryTextColor = 'color-mix(in srgb, var(--text), transparent 30%)';
const secondaryBgColorClass = 'bg-[var(--secondary)]';
const accentColorClass = 'text-[var(--accent)]';
const textPrimaryColorClass = 'text-[var(--text)]';
const textSecondaryColorClass = `text-[${secondaryTextColor}]`; // Check if this syntax works, might need adjustment

// --- Variantes de Animación ---
const pageVariants = {
  // Removed initial hidden state if relying on route transitions
  // hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }, // Faster entry maybe?
  exit: { opacity: 0, transition: { duration: 0.2 } } // Faster exit
};
const sectionFadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const hoverTransition = { duration: 0.4, ease: "easeInOut" };

// --- Componente Principal ---
function NewImageDetailPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get location state if passed
  useSmoothScroll(true, 0.06);

  const [projectData, setProjectData] = useState(null);
  const [activeInfoTab, setActiveInfoTab] = useState('details');
  const uniqueTextRef = useRef(null);

  // Attempt to get initial image src from navigation state for seamless transition
  // Ensure HomePage/ProjectsPage pass `imageSrc` in `navigate` state
  const initialImageSrc = location.state?.imageSrc;
  // Use placeholder if not passed (optional)
  // Prioritize loaded data, then state, then null/placeholder
  const heroImageSrc = projectData?.image ? getImageUrl(projectData.image) : initialImageSrc || getImageUrl(null);


  // --- Carga de Datos ---
  useEffect(() => {
    window.scrollTo(0, 0);
    // Ensure pageData is available before accessing pageId
    const data = pageData ? pageData[pageId] : null;

    if (data) {
        // Delay setting data slightly to allow transition to potentially finish? Optional.
        // setTimeout(() => setProjectData(data), 50);
        setProjectData(data);
    } else {
      console.warn(`Data not found for pageId '${pageId}'. Navigating back.`);
      navigate(-1); // Navigate back if data not found
    }
  }, [pageId, navigate]);

  // --- Animación UniqueText (Confirmed Present) ---
  useEffect(() => {
    const textElement = uniqueTextRef.current;
    // Ensure animation only runs when data AND text is present
    if (!textElement || !projectData?.uniqueText) {
        if(textElement) {
            textElement.innerHTML = ''; // Clear content if data/text is missing
            textElement.removeAttribute('data-processed');
        }
        return; // Exit effect if no text element or text data
    }
    let animationFrameId;
    let currentProgress = 0;
    // Only re-process HTML if text content actually changes or not processed yet
    if (textElement.innerText !== projectData.uniqueText || !textElement.dataset.processed) {
        const words = projectData.uniqueText.split(' ');
        textElement.innerHTML = words.map(word =>
            `<span class="word">${word.split('').map(char =>
                `<span class="char" style="color: ${secondaryTextColor}; transition: color 0.1s ease-out;">${char}</span>`
            ).join('')}</span> `
        ).join('');
        textElement.dataset.processed = "true";
    }
    // Animation loop runs based on scroll
    const animateText = () => {
        if (!textElement) return;
        const textPos = textElement.getBoundingClientRect();
        // Animate when the element is roughly in the middle 80% of the viewport
        if (textPos.top < window.innerHeight * 0.9 && textPos.bottom > window.innerHeight * 0.1) {
             const viewportPosition = 1 - (textPos.top / (window.innerHeight * 0.8)); // Normalize position within the 80% range
             const targetProgress = Math.max(0, Math.min(1, viewportPosition));
             currentProgress += (targetProgress - currentProgress) * 0.15; // Smoothing factor
            const chars = textElement.querySelectorAll('.char');
            const totalChars = chars.length;
            if (totalChars > 0) {
                chars.forEach((char, i) => {
                    const threshold = i / (totalChars * 1.5); // Stagger animation
                    const charActive = currentProgress > threshold;
                    char.style.color = charActive ? 'var(--text)' : secondaryTextColor;
                });
            }
        }
        animationFrameId = requestAnimationFrame(animateText);
    };
    // Start animation loop if processed
    if (textElement.dataset.processed) {
       animationFrameId = requestAnimationFrame(animateText);
    }
    // Cleanup function
    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [projectData]); // Rerun effect if projectData changes


  const handleExit = () => {
    navigate(-1); // Navigate back one step in history
  };

  // --- Renderizado (No explicit loading return) ---
  return (
    <motion.div
      key={`detail-v3.4-${pageId}`} // Use pageId in key for consistency on navigation
      // Removed initial="hidden" to let AnimatePresence handle entry animation from router
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="relative w-full min-h-screen bg-[var(--background)] text-[var(--text)] font-sans antialiased overflow-x-hidden"
    >
      {/* --- Botón Cerrar (Sticky) --- */}
       <motion.button
        className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md"
        style={{
           // Use rgba for better browser compatibility with transparency
           backgroundColor: 'rgba(var(--text-rgb), 0.05)', // Assuming --text-rgb is defined
           backdropFilter: 'blur(8px)',
           WebkitBackdropFilter: 'blur(8px)', // For Safari
        }}
        onClick={handleExit} aria-label="Cerrar"
        // Animate button visibility slightly delayed
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.4 } }}
        exit={{ opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--text-rgb), 0.1)' }} // Slightly darker on hover
        whileTap={{ scale: 0.95 }}
      >
        <span className={`text-xl font-semibold ${textPrimaryColorClass}`}>✕</span>
      </motion.button>

      {/* --- Hero Section (Rendered immediately) --- */}
      <div className="w-full relative mb-16 md:mb-24">
        <div className="relative w-full overflow-hidden">
          {/* Gradients for text readability */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[var(--background)]/60 via-[var(--background)]/20 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-transparent z-10 pointer-events-none"></div>
          {/* Image uses heroImageSrc which prioritizes loaded data, then location state */}
          {/* Consider adding layoutId prop here if doing shared element transition */}
          <motion.img
            // layoutId={`project-image-${pageId}`} // Example layoutId for shared element transition
            src={heroImageSrc}
            alt={projectData?.title || 'Project Image'} // Use loaded title if available, fallback text
            className="block w-full h-auto"
            loading="eager" // Load hero image immediately
          />
        </div>
        {/* Texts: Conditionally render or fade in when projectData is ready */}
        <AnimatePresence>
         {projectData && ( // Only render text when data is available
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }} // Fade in text slightly delayed
                className="absolute top-0 left-0 z-20 p-6 md:p-10 lg:p-16 pointer-events-none">
                  <h2 className={`text-lg md:text-xl ${textSecondaryColorClass} uppercase tracking-wider mb-1 drop-shadow-sm`}>{projectData.projectName}</h2>
                  <h1 className={`text-4xl md:text-6xl lg:text-7xl ${textPrimaryColorClass} font-bold leading-tight drop-shadow-md`}>{projectData.title}</h1>
              </motion.div>
              <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} // Fade in text slightly delayed
                  className="absolute bottom-0 left-0 z-20 p-6 md:p-10 lg:p-16 max-w-3xl pointer-events-none">
                  <p className={`text-lg md:text-xl lg:text-2xl ${textPrimaryColorClass} font-medium leading-relaxed drop-shadow-sm`}>{projectData.description}</p>
              </motion.div>
            </>
         )}
         </AnimatePresence>
      </div>

      {/* --- Sections below only render when projectData is loaded --- */}
      <AnimatePresence>
        {projectData && ( // Conditionally render the rest of the content
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* --- Unique Text Section --- */}
            <motion.section
              className="container mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24 lg:py-32 flex justify-end"
              variants={sectionFadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            >
              <p ref={uniqueTextRef} className="text-2xl md:text-3xl lg:text-4xl max-w-2xl lg:max-w-3xl leading-relaxed text-left">
                {/* Content will be set by the useEffect hook */}
                {projectData.uniqueText} {/* Render initial text for SSR/fallback */}
              </p>
            </motion.section>

            {/* --- Details / Team Section --- */}
            <motion.section
              className="container mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24 lg:py-32"
              variants={sectionFadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            >
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center ${textPrimaryColorClass}`}>
                  Detalles del Proyecto
              </h2>
              {/* Tab Buttons */}
              <div className="flex justify-center space-x-4 mb-10">
                <button onClick={() => setActiveInfoTab('details')} className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeInfoTab === 'details' ? 'bg-[var(--accent)] text-[var(--background)]' : `bg-[var(--secondary)]/10 ${textSecondaryColorClass} hover:bg-[var(--secondary)]/20`}`}>Detalles</button>
                <button onClick={() => setActiveInfoTab('team')} className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeInfoTab === 'team' ? 'bg-[var(--accent)] text-[var(--background)]' : `bg-[var(--secondary)]/10 ${textSecondaryColorClass} hover:bg-[var(--secondary)]/20`}`}>Equipo</button>
              </div>
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeInfoTab} // Key change triggers animation
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {/* Map over details or team based on active tab */}
                  {(activeInfoTab === 'details' ? projectData.details : projectData.team)?.map((item, index) => (
                    <div key={`${activeInfoTab}-${index}`} className={`${secondaryBgColorClass} p-6 rounded-2xl shadow-sm`}>
                      <p className={`text-sm ${textSecondaryColorClass} mb-1`}>{item.label}</p>
                      <p className={`text-base font-medium ${textPrimaryColorClass}`}>{item.value}</p>
                    </div>
                  ))}
                  {/* Show message if no data for the active tab */}
                  {(activeInfoTab === 'details' ? !projectData.details?.length : !projectData.team?.length) && (
                    <p className={`${textSecondaryColorClass} col-span-full text-center`}>No hay información de {activeInfoTab === 'details' ? 'detalles' : 'equipo'} disponible.</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.section>


            {/* --- Gallery Section --- */}
            {projectData.gallery && projectData.gallery.length > 0 && (
              <motion.section
                  className="px-6 sm:px-10 md:px-20 py-16 md:py-24 lg:py-32" // Use full width for gallery potentially
                  variants={sectionFadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
              >
                  <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20 text-center ${textPrimaryColorClass}`}>
                      Galería
                  </h2>
                  <div>
                      {projectData.gallery.map((item, index) => (
                          <motion.div
                              key={`gallery-${index}`}
                              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-24 md:mb-32 lg:mb-40"
                              variants={sectionFadeUpVariants}
                              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                          >
                              {/* Image Column */}
                              <motion.div
                                  className={`group relative ${index % 2 !== 0 ? 'md:order-last' : ''}`} // Alternate image order
                                  whileHover={{ scale: 0.97 }} // Slight shrink on hover container
                                  transition={hoverTransition}
                              >
                                  <div className="overflow-hidden rounded-4xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                      <motion.img
                                          src={getImageUrl(item.image, 'large')}
                                          alt={item.title || `Gallery image ${index + 1}`}
                                          className="block w-full h-auto"
                                          whileHover={{ scale: 1.05 }} // Zoom image inside on hover
                                          transition={hoverTransition}
                                          loading="lazy" // Lazy load gallery images
                                      />
                                  </div>
                              </motion.div>
                              {/* Text Column */}
                              <div className="px-4 py-4 md:py-0">
                                  <h3 className={`text-2xl md:text-3xl font-semibold mb-3 ${textPrimaryColorClass}`}>{item.title}</h3>
                                  <p className={`text-lg md:text-xl ${textSecondaryColorClass} leading-relaxed`}>{item.description}</p>
                              </div>
                          </motion.div>
                      ))}
                  </div>
              </motion.section>
            )}


            {/* --- Insights Section --- */}
            {projectData.insights && (
              <motion.section
                className="container mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24 lg:py-32"
                variants={sectionFadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
              >
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20 text-center ${textPrimaryColorClass}`}>
                    Perspectivas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Insight Card 1 */}
                  <motion.div
                     className={`${secondaryBgColorClass} p-8 md:p-10 rounded-3xl shadow-sm`}
                     whileHover={{ backgroundColor: "var(--secondary)", y: -5 }} // Lift effect on hover
                     transition={{ duration: 0.3 }}
                  >
                    <h3 className={`text-xl font-bold mb-4 ${textPrimaryColorClass}`}>Visión Creativa</h3>
                    <p className={`${textSecondaryColorClass} leading-relaxed`}>{projectData.insights.vision}</p>
                  </motion.div>
                  {/* Insight Card 2 */}
                  <motion.div
                     className={`${secondaryBgColorClass} p-8 md:p-10 rounded-3xl shadow-sm`}
                     whileHover={{ backgroundColor: "var(--secondary)", y: -5 }} // Lift effect on hover
                     transition={{ duration: 0.3 }}
                  >
                    <h3 className={`text-xl font-bold mb-4 ${textPrimaryColorClass}`}>Desafíos Técnicos</h3>
                    <p className={`${textSecondaryColorClass} leading-relaxed`}>{projectData.insights.challenge}</p>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* --- Footer --- */}
            <Footer />
          </motion.div> // End conditional wrapper for content sections
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default NewImageDetailPage;