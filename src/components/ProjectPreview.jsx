// src/components/ProjectPreview.jsx
import { motion } from 'framer-motion';

// Helper para URL (con placeholder oscuro) - SE MANTIENE PERO NO SE USA PARA LA IMAGEN PRINCIPAL
const placeholderBg = '#0a0f19';
const placeholderText = '#f1f1ee';
const getImageUrl = (path, placeholder = `https://placehold.co/600x800/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Preview`) => {
    const base = import.meta.env.BASE_URL || '/';
    if (!path) return placeholder;
    const imagePath = path.startsWith('/') ? path.substring(1) : path;
    return `${base}/${imagePath}`;
};

const ProjectPreview = ({
  src,
  index,
  isHovered,
  isExpanded,
  onMouseEnter,
  onMouseLeave,
  onClick,
  imageRef,
}) => {
  // Simplified variants - just one animation state
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Separating text variant from overlay
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div
      className="group relative flex-shrink-0 w-full h-full cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      ref={imageRef}
      style={{
        zIndex: isExpanded ? 50 : 1,
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    >
      {/* Contenedor */}
      <div
        className="w-full h-full relative overflow-hidden bg-[--color-surface]/30 rounded-4xl"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {/* Image - Using regular img with style for better performance */}
        <img
          // --- CAMBIO PRINCIPAL ---
          // Usa la prop 'src' directamente, ya que viene procesada desde HomePage
          src={src}
          // --- FIN CAMBIO PRINCIPAL ---
          alt={`Project ${index + 1}`}
          className="w-full h-full object-cover"
          draggable={false}
          style={{
            transformOrigin: "center center",
            transform: isHovered && !isExpanded ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 500ms ease-out',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          // Opcional: Añadir onError para mostrar placeholder si falla la carga
          onError={(e) => { e.target.src = getImageUrl(null); }} // Usa la función getImageUrl solo para el placeholder en caso de error
        />

        {/* Overlay with text */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 bg-[--color-base]/60 flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            transition={{ duration: 0.3 }}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {/* Keep the text always in DOM but control visibility with variants */}
            <motion.span
              className="text-[--color-text-primary] text-4xl md:text-6xl font-semibold pointer-events-none"
              variants={textVariants}
              transition={{ duration: 0.3, delay: 0.1 }} // Slight delay to ensure overlay appears first
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              Ver más
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;