// src/components/AsymmetricLayoutSection.jsx
import { motion } from 'framer-motion';

// --- CAMBIO PRINCIPAL ---
// Helper para construir URL (Versión estandarizada)
const placeholderBg = '#0a0f19'; // Color de fondo para placeholder
const placeholderText = '#f1f1ee'; // Color de texto para placeholder
const getImageUrl = (path, placeholder = `https://placehold.co/800x600/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Feature+Image`) => {
  // Asegura que base no tenga / al final para evitar dobles barras
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  if (!path) return placeholder;
  // Si ya es absoluta (http) o placeholder, devolverla
  if (path.startsWith('http') || path.startsWith('https://placehold.co')) {
      return path;
  }
  // Asegura que la ruta relativa NO empiece con '/' porque la base ya podría tenerla o no
  // y une la base y la ruta relativa asegurando una sola barra
  const imagePath = path.startsWith('/') ? path.substring(1) : path;
  return `${base}/${imagePath}`;
};
// --- FIN CAMBIO PRINCIPAL ---

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
      {/* Columna de Imagen */}
      <motion.div
        className={`${imageOrder} overflow-hidden rounded-4xl shadow-md bg-[--color-surface]/30`}
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
            // Usa la función getImageUrl estandarizada
            src={getImageUrl(imageUrl)}
            alt="Feature image"
            className={`w-full h-full object-cover ${imageClassName}`}
            // Opcional: Añadir onError para mostrar placeholder si falla la carga
            onError={(e) => { e.target.src = getImageUrl(null); }}
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
        {/* Renderiza el texto como párrafo o como elemento si es un componente React */}
        {typeof text === 'string' ? (
          <p className={`${textClassName}`}>
            {text}
          </p>
        ) : (
          <div className={textClassName}> {/* Envuelve el componente React en un div con las clases */}
             {text}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AsymmetricLayoutSection;