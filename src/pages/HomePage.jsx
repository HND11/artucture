// src/pages/HomePage.jsx
// VERSIÓN FINAL: Filosofía actualizada desde enterprise data.txt

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Importa componentes y hooks
import Header from '../components/Header';
import InfiniteCarousel from '../components/InfiniteCarousel';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';
import TextFeatureSection from '../components/TextFeatureSection';
import AsymmetricLayoutSection from '../components/AsymmetricLayoutSection';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useDisableBodyScroll from '../hooks/useDisableBodyScroll';
import Footer from '../components/Footer';
import { projectList } from '../data/ProjectData.js';

// --- Variantes de Transición de Página Suaves ---
const pageTransitionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } },
  noExit: { opacity: 0, y: 0, transition: { duration: 0 } }
};

// --- Helper para URL ---
const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const placeholderBg = '#0a0f19';
const placeholderText = '#f1f1ee';
const getImageUrl = (path, placeholder = `https://placehold.co/600x800/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Image`) => {
    if (!path) return placeholder;
    if (path.startsWith('http') || path.startsWith('https://placehold.co')) {
        return path;
    }
    const imagePath = path.startsWith('/') ? path.substring(1) : path;
    return `${base}/${imagePath}`;
};


// --- Datos para el carrusel ---
const carouselImagesData = Array.isArray(projectList) ? projectList.slice(0, 6) : [];
const fullCarouselImages = carouselImagesData
    .map(p => p?.image)
    .filter(Boolean)
    .map(src => getImageUrl(src));

// --- Variantes de Animación (Otras) ---
const sectionVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

// --- Funciones Auxiliares de Animación y Scroll ---
const easeTo = (start, end, duration, onUpdate, onComplete) => {
    const startTime = performance.now();
    const animateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
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


// --- Componente HomePage ---
function HomePage() {
  const navigate = useNavigate();
  const smoothScrollControl = useSmoothScroll(true, 0.06);
  const { disableScroll, enableScroll } = useDisableBodyScroll();

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [originalImageRect, setOriginalImageRect] = useState(null);
  const [isExitingViaImageClick, setIsExitingViaImageClick] = useState(false);
  const homePageRef = useRef(null);
  const philosophyTextRef = useRef(null);

  // --- Lógica de Navegación y Expansión ---
  const handleImageClick = useCallback((indexInDuplicatedArray, imageElement) => {
    const originalIndex = indexInDuplicatedArray % carouselImagesData.length;
    if (expandedIndex !== null || !imageElement || !carouselImagesData[originalIndex]) return;

    setIsExitingViaImageClick(true);

    const projectToNavigate = carouselImagesData[originalIndex];
    const projectId = projectToNavigate.id;
    const rect = imageElement.getBoundingClientRect();
    const currentOriginalImageRect = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    const isScrolledDown = window.scrollY > 10;

    const processImageExpand = () => {
        disableScroll();
        setOriginalImageRect(currentOriginalImageRect);
        setExpandedIndex(originalIndex);
        setTimeout(() => {
            const pageTarget = `/project/${projectId}`;
            navigate(pageTarget, { state: { imageSrc: getImageUrl(projectToNavigate.image), originRect: currentOriginalImageRect } });
        }, 600);
    };

    if (isScrolledDown) {
        scrollToTop(processImageExpand);
    } else {
        processImageExpand();
    }

  }, [expandedIndex, navigate, carouselImagesData, disableScroll]);


  // --- Efecto Parallax ---
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // --- Limpieza del bloqueo de scroll ---
  useEffect(() => {
      return () => {
          enableScroll();
      };
  }, [enableScroll]);

  // --- Text Animation Effect ---
   useEffect(() => {
      const philosophyTextElement = philosophyTextRef.current;
      if (!philosophyTextElement) return;
      let animationFrameId;
      let currentProgress = 0;
      const secondaryTextColor = 'color-mix(in srgb, var(--text), transparent 30%)';
      // Solo procesa si no se ha hecho antes y hay texto
      if (!philosophyTextElement.dataset.processed && philosophyTextElement.innerText?.trim()) {
          const words = philosophyTextElement.innerText.trim().split(/(\s+)/); // Divide por espacios manteniendo los espacios
          philosophyTextElement.innerHTML = words.map((wordOrSpace, index) => {
              if (wordOrSpace.trim() === '') {
                  return `<span key="space-${index}" class="whitespace">${wordOrSpace}</span>`; // Mantén los espacios
              }
              return `<span key="word-${index}" class="word">${wordOrSpace.split('').map((char, charIndex) =>
                  `<span key="char-${index}-${charIndex}" class="char" style="color: ${secondaryTextColor}; transition: color 0.1s ease-out;">${char}</span>`
              ).join('')}</span>`;
          }).join('');
          philosophyTextElement.dataset.processed = "true";
      }
      const animateText = () => {
          if (!philosophyTextElement) return;
          const philosophyTextPos = philosophyTextElement.getBoundingClientRect();
          // Empieza animación un poco antes de que entre completamente en pantalla
          if (philosophyTextPos.top < window.innerHeight * 0.9 && philosophyTextPos.bottom > window.innerHeight * 0.1) {
              // Calcula progreso basado en cuánto del elemento ha entrado desde la parte inferior
              const elementHeight = philosophyTextPos.height;
              const visibleRatio = (window.innerHeight - philosophyTextPos.top) / elementHeight;
              const targetProgress = Math.max(0, Math.min(1, visibleRatio * 1.5)); // Multiplicador para acelerar un poco

              currentProgress += (targetProgress - currentProgress) * 0.15; // Suavizado

              const chars = philosophyTextElement.querySelectorAll('.char');
              const totalChars = chars.length;
              if (totalChars > 0) {
                  chars.forEach((char, i) => {
                      // Umbral basado en la posición del caracter dentro del texto total
                      const threshold = i / (totalChars * 1.5); // Ajusta el divisor para controlar la velocidad/distribución
                      const charActive = currentProgress > threshold;
                      char.style.color = charActive ? 'var(--text)' : secondaryTextColor;
                  });
              }
          }
          animationFrameId = requestAnimationFrame(animateText);
      };
      // Inicia la animación solo si el texto fue procesado
      if (philosophyTextElement.dataset.processed === "true") {
          animationFrameId = requestAnimationFrame(animateText);
      }
      return () => {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
  }, []); // Dependencia vacía para que se ejecute solo una vez al montar


  return (
    <motion.div
      key="home-page"
      ref={homePageRef}
      initial="hidden"
      animate="visible"
      exit={isExitingViaImageClick ? "noExit" : "exit"}
      variants={pageTransitionVariants}
      className="overflow-x-hidden min-h-screen font-sans antialiased bg-[var(--background)] text-[var(--text)]"
    >
      <Header />

      {/* Carrusel */}
      {fullCarouselImages.length > 0 && (
        <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden py-4">
          <InfiniteCarousel
            images={fullCarouselImages}
            onImageClick={handleImageClick}
            expandedIndex={expandedIndex}
            className="z-10"
          />
        </div>
      )}

      {/* --- Secciones de Contenido --- */}
      <ScrollAnimatedSection className="container mx-auto px-6 sm:px-10 md:px-20 py-32 md:py-48 lg:py-64">
         <TextFeatureSection
          title="Diseñamos Experiencias Únicas"
          subtitle="Artucture: Diseñando sueños y construyendo hogares" // Subtítulo actualizado con eslogan [cite: 1]
          titleSize="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
          subtitleColor="text-[var(--text)]"
          subtitleSize="text-lg md:text-xl lg:text-2xl tracking-wide"
        />
      </ScrollAnimatedSection>

      {/* Sección de Filosofía */}
      {Array.isArray(projectList) && projectList.length > 1 && (
        <ScrollAnimatedSection ref={targetRef} className="container mx-auto px-6 sm:px-10 md:px-20 py-24 md:py-32 lg:py-40 overflow-hidden relative">
           <motion.div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-[var(--secondary)]/50 via-[var(--secondary)]/10 to-transparent -z-10" style={{ y: parallaxY }} />
           <AsymmetricLayoutSection
              imageUrl={getImageUrl(projectList[1]?.image)}
              text={ // Texto de misión/filosofía actualizado [cite: 1, 2, 3]
                <motion.p ref={philosophyTextRef} className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[var(--text)]">
                  Transformamos los sueños de nuestros clientes en espacios únicos y extraordinarios a través de un diseño innovador, funcional y sostenible. Creamos soluciones arquitectónicas personalizadas que integran tecnología moderna, respeto por el medio ambiente y armonía entre el hábitat natural y social.
                </motion.p>
              }
              imageSide="right"
           />
        </ScrollAnimatedSection>
      )}

       {/* Proyectos Recientes Section */}
       <ScrollAnimatedSection className="bg-[var(--background)] text-[var(--text)] py-32 md:py-40 lg:py-48">
          <div className="container mx-auto px-6 sm:px-10 md:px-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">Proyectos Recientes</h2>
            <p className="text-xl md:text-2xl text-[var(--text)] max-w-3xl mx-auto mb-12 leading-relaxed">
              Descubre cómo transformamos visiones audaces en realidades tangibles y espacios que inspiran.
            </p>
            <motion.button onClick={() => navigate('/projects')} className="bg-[var(--accent)] text-[var(--background)] font-semibold px-10 py-4 rounded-full text-lg hover:bg-opacity-90 transition-colors duration-300 shadow-md hover:shadow-lg" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                 Explorar Galería
             </motion.button>
         </div>
       </ScrollAnimatedSection>

      {/* Otra sección asimétrica si existe */}
      {Array.isArray(projectList) && projectList.length > 3 && (
        <ScrollAnimatedSection animation="slideInLeft" className="container mx-auto px-6 sm:px-10 md:px-20 py-24 md:py-32 lg:py-40 overflow-hidden">
           <AsymmetricLayoutSection
             imageUrl={getImageUrl(projectList[3]?.image)}
             text="Buscamos aprovechar las características únicas de cada lugar para diseñar ambientes visualmente impactantes, prácticos y pensados para perdurar." // Texto adicional de la misión [cite: 3]
             imageSide="left"
             textClassName="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[var(--text)]"
           />
         </ScrollAnimatedSection>
      )}

      <Footer />

      {/* Clon para Animación */}
      <AnimatePresence>
          {expandedIndex !== null &&
           originalImageRect &&
           carouselImagesData[expandedIndex % carouselImagesData.length] &&
           fullCarouselImages[expandedIndex % fullCarouselImages.length] && (
              <motion.div
                key={`cloned-image-${expandedIndex}`}
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
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <motion.img
                  src={fullCarouselImages[expandedIndex % fullCarouselImages.length]}
                  alt="Expanding project"
                  className="w-full h-full object-cover object-top"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                />
              </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
}

export default HomePage;