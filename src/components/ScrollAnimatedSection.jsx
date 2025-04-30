// src/components/ScrollAnimatedSection.jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

// Componente reutilizable para animar elementos al hacer scroll
const ScrollAnimatedSection = forwardRef(({
    children,
    className,
    animation = "fadeUp", // 'fadeUp', 'fade', 'slideInLeft', 'slideInRight', 'scaleUp'
    delay = 0,
    duration = 0.8,
    amount = 0.2, // Porcentaje visible para activar
    once = true, // Animar solo una vez
    tag = "section", // Etiqueta HTML
    ...rest
}, ref) => {

  const variants = {
    fadeUp: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slideInLeft: { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
    slideInRight: { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
    scaleUp: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }
  };

  const selectedVariant = variants[animation] || variants.fadeUp;
  const MotionComponent = motion[tag];

  return (
    <MotionComponent
      ref={ref} // Pasa la ref
      className={className}
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once, amount: amount }}
      transition={{ duration: duration, delay: delay, ease: [0.16, 1, 0.3, 1] }} // Easing suave
      {...rest}
    >
      {children}
    </MotionComponent>
  );
});

ScrollAnimatedSection.displayName = 'ScrollAnimatedSection'; // Para DevTools

export default ScrollAnimatedSection;
