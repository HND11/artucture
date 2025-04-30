// src/components/InfiniteCarousel.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from 'framer-motion';
import ProjectPreview from './ProjectPreview';

const InfiniteCarousel = ({
  images,
  onImageClick,
  expandedIndex,
  className,
  itemWidth = 640, // Ancho absoluto de cada item en px (configurable)
  itemGap = 16 // Espacio entre elementos en px (configurable)
}) => {
  // Duplica imágenes para efecto infinito
  const duplicatedImages = images ? [...images, ...images] : [];

  // --- Refs & State ---
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const speedRef = useRef(0.04); // Velocidad base
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndexInternal, setHoveredIndexInternal] = useState(null);

  // --- Lógica de Animación ---
  const animate = useCallback((timestamp) => {
    if (!containerRef.current || expandedIndex !== null || !duplicatedImages.length) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        return;
    };

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const elapsed = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    const currentSpeed = isHovering ? speedRef.current * 0.5 : speedRef.current;
    const pixelsToMove = elapsed * currentSpeed;
    positionRef.current -= pixelsToMove;

    // Calculamos el punto donde reiniciamos la animación
    // Ahora basado en medidas absolutas
    const singleSetWidth = duplicatedImages.length / 2 * (itemWidth + itemGap);
    if (Math.abs(positionRef.current) >= singleSetWidth) {
      positionRef.current += singleSetWidth;
    }

    containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
  }, [expandedIndex, isHovering, duplicatedImages.length, itemWidth, itemGap]);

  // --- Iniciar/Detener Animación ---
  const startAnimation = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    lastTimeRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // --- Ciclo de Vida y Visibilidad ---
  useEffect(() => {
    if (!duplicatedImages.length) return; // No hacer nada si no hay imágenes

    if (expandedIndex === null) {
      startAnimation();
    } else {
      stopAnimation();
    }

    const handleVisibility = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (expandedIndex === null) {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopAnimation();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [expandedIndex, startAnimation, stopAnimation, duplicatedImages.length]);

  // --- Manejadores de Eventos ---
  const handleMouseEnterContainer = () => setIsHovering(true);
  const handleMouseLeaveContainer = () => {
    setIsHovering(false);
    setHoveredIndexInternal(null);
  };

  const handleMouseEnterItem = (index) => {
     if (expandedIndex === null) setHoveredIndexInternal(index);
  };

  const handleMouseLeaveItem = () => {
    if (expandedIndex === null) setHoveredIndexInternal(null);
  };

  const handleItemClick = (index) => {
     if (expandedIndex === null && onImageClick && images.length > 0) {
         const originalIndex = index % images.length;
         // Asegurarse que la ref existe antes de pasarla
         const element = imageRefs.current[index];
         if (element) {
            onImageClick(originalIndex, element);
         } else {
            console.warn(`Ref for index ${index} not found.`);
            onImageClick(originalIndex, null);
         }
     }
  };

  // Si no hay imágenes, no renderizar nada o mostrar un mensaje
  if (!duplicatedImages.length) {
    return <div className={`w-full h-full flex items-center justify-center ${className}`}>Loading images...</div>;
  }

  // Calcula el ancho total del contenedor basado en medidas absolutas
  const totalContainerWidth = duplicatedImages.length * (itemWidth + itemGap) - itemGap;

  return (
    <div
      className={`w-full h-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
    >
      <motion.div
        className="flex h-full"
        ref={containerRef}
        style={{
          width: `${totalContainerWidth}px`, // Ancho absoluto calculado
          willChange: 'transform',
          cursor: expandedIndex !== null ? 'default' : 'grab',
        }}
        initial={false}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-full"
            style={{ 
              width: `${itemWidth}px`,
              marginRight: index === duplicatedImages.length - 1 ? '0' : `${itemGap}px`
            }}
          >
            <ProjectPreview
              src={src}
              index={index}
              isHovered={hoveredIndexInternal === index}
              isExpanded={expandedIndex === (index % images.length)}
              onMouseEnter={() => handleMouseEnterItem(index)}
              onMouseLeave={handleMouseLeaveItem}
              onClick={() => handleItemClick(index)}
              imageRef={el => (imageRefs.current[index] = el)}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;