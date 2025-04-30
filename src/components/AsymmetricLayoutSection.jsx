// src/components/AsymmetricLayoutSection.jsx
import { motion } from 'framer-motion';

// Helper para construir URL
const getImageUrl = (path, placeholder = 'https://placehold.co/800x600/0a0f19/f1f1ee?text=Feature+Image') => {
  const base = import.meta.env.BASE_URL || '/';
  if (!path) return placeholder;
  const imagePath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}${imagePath}`;
};

const AsymmetricLayoutSection = ({
    imageUrl,
    text,
    imageSide = "left",
    className,
    textClassName = "text-xl md:text-2xl lg:text-3xl leading-relaxed text-[--color-text-secondary]", // Ajustado tamaño
    imageClassName = "aspect-[4/3] md:aspect-auto"
}) => {
  const imageOrder = imageSide === 'left' ? 'order-first' : 'md:order-last';
  const textOrder = imageSide === 'left' ? 'order-last' : 'md:order-first';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center ${className}`}>
      {/* Columna de Imagen - Quitamos 'border' y 'border-[--color-border]' */}
      <motion.div
        className={`${imageOrder} overflow-hidden rounded-4xl shadow-md bg-[--color-surface]/30`} // <-- Borde eliminado, redondeado 4xl
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
            src={getImageUrl(imageUrl)}
            alt="Feature image"
            className={`w-full h-full object-cover ${imageClassName}`}
        />
      </motion.div>

      {/* Columna de Texto */}
      <motion.div
        className={`${textOrder}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
        <p className={`${textClassName}`}>
          {text}
        </p>
      </motion.div>
    </div>
  );
};

export default AsymmetricLayoutSection;
