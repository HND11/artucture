// src/components/AsymmetricLayoutSection.jsx
import { motion } from 'framer-motion';

// --- ELIMINADO ---
// Se quita la definición duplicada de getImageUrl de aquí.
// Este componente ahora usará la URL que recibe directamente.
// --- FIN ELIMINADO ---

const AsymmetricLayoutSection = ({
    imageUrl, // Recibe la URL ya procesada desde HomePage
    text,
    imageSide = "left",
    className,
    textClassName = "text-xl md:text-2xl lg:text-3xl leading-relaxed text-[--color-text-secondary]",
    imageClassName = "aspect-[4/3] md:aspect-auto"
}) => {
  const imageOrder = imageSide === 'left' ? 'order-first' : 'md:order-last';
  const textOrder = imageSide === 'left' ? 'order-last' : 'md:order-first';

  // Preparamos un placeholder por si imageUrl viene vacío o nulo, o para el onError
  const placeholderBg = '#0a0f19';
  const placeholderText = '#f1f1ee';
  const placeholderUrl = `https://placehold.co/800x600/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Feature+Image`;


  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center ${className}`}>
      {/* Columna de Imagen */}
      <motion.div
        className={`${imageOrder} overflow-hidden rounded-4xl shadow-md bg-[--color-surface]/30`}
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
            // --- CAMBIO CLAVE ---
            // Usa directamente el prop 'imageUrl'. Si es nulo/vacío, usa el placeholder.
            src={imageUrl || placeholderUrl}
            // --- FIN CAMBIO CLAVE ---
            alt="Feature image" // Considera pasar un alt text más descriptivo como prop
            className={`w-full h-full object-cover ${imageClassName}`}
            // onError ahora simplemente pone el placeholder estándar
            onError={(e) => { e.target.src = placeholderUrl; }}
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
        {typeof text === 'string' ? (
          <p className={`${textClassName}`}>
            {text}
          </p>
        ) : (
          <div className={textClassName}>
             {text}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AsymmetricLayoutSection;