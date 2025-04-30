// src/hooks/useSmoothScroll.js
import { useEffect, useRef } from 'react';

/**
 * Hook personalizado para implementar un efecto de scroll suave (lerp).
 * ADVERTENCIA: Este tipo de scroll puede interferir con el scroll nativo,
 * librerías de animación basadas en scroll (como Framer Motion `whileInView`
 * en ciertos casos), y la accesibilidad. Úsalo con precaución y considera
 * alternativas como CSS `scroll-behavior: smooth` o librerías dedicadas (Lenis).
 *
 * @param {boolean} isEnabled - Si el scroll suave debe estar activo.
 * @param {number} damping - Factor de suavizado (0 a 1). Valores más bajos = más suave. Ej: 0.1
 */
const useSmoothScroll = (isEnabled = true, damping = 0.1) => {
  // Refs para mantener el estado del scroll entre renders
  const currentScrollY = useRef(window.scrollY); // Posición actual renderizada
  const targetScrollY = useRef(window.scrollY);  // Posición objetivo (a donde queremos ir)
  const scrollAnimationId = useRef(null);        // ID de requestAnimationFrame
  const isExternalScroll = useRef(false);        // Flag para detectar scroll no iniciado por este hook

  useEffect(() => {
    // Si el hook está deshabilitado, cancela cualquier animación y limpia listeners
    if (!isEnabled) {
      if (scrollAnimationId.current) {
        cancelAnimationFrame(scrollAnimationId.current);
        scrollAnimationId.current = null;
      }
      // Aquí deberías remover los listeners si los guardaste con useCallback/useRef
      // Por simplicidad en este ejemplo, no se guardan referencias explícitas para remover.
      // En una implementación robusta, guardarías las funciones de los listeners.
      return;
    }

    // Sincroniza las posiciones al montar o habilitar
    currentScrollY.current = window.scrollY;
    targetScrollY.current = window.scrollY;

    // Función principal de animación (lerp)
    const animateScroll = () => {
      // Si el scroll fue causado por algo externo (ej. click en link #),
      // detenemos la animación hasta que el usuario vuelva a usar la rueda.
      if (isExternalScroll.current) {
        scrollAnimationId.current = null; // Detiene el bucle
        return;
      }

      // Calcula la diferencia entre el objetivo y la posición actual
      const diff = targetScrollY.current - currentScrollY.current;

      // Si la diferencia es muy pequeña, ajusta directamente al objetivo y detén la animación
      if (Math.abs(diff) < 0.5) {
        currentScrollY.current = targetScrollY.current;
        // No llamamos a window.scrollTo aquí para evitar posibles bucles con el listener 'scroll'
        scrollAnimationId.current = null;
        return;
      }

      // Interpola linealmente (lerp) hacia el objetivo
      currentScrollY.current += diff * damping;
      // Aplica la posición calculada al scroll real del navegador
      window.scrollTo(0, currentScrollY.current);

      // Continúa la animación en el siguiente frame
      scrollAnimationId.current = requestAnimationFrame(animateScroll);
    };

    // Manejador para el evento 'wheel' (rueda del ratón)
    const handleWheel = (e) => {
      // Previene el comportamiento de scroll por defecto del navegador
      e.preventDefault();
      isExternalScroll.current = false; // El scroll fue iniciado por el usuario con la rueda

      // Actualiza la posición objetivo basada en la dirección de la rueda
      targetScrollY.current += e.deltaY;

      // Limita el scroll para que no se salga de los límites del documento
      targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, document.body.scrollHeight - window.innerHeight));

      // Si la animación no está corriendo, iníciala
      if (!scrollAnimationId.current) {
        // Sincroniza la posición actual antes de empezar para evitar saltos
        currentScrollY.current = window.scrollY;
        scrollAnimationId.current = requestAnimationFrame(animateScroll);
      }
    };

     // Listener para detectar scrolls que NO fueron iniciados por este hook
     const handleScroll = () => {
         // Si la animación no está activa (porque se detuvo o fue externa)
         if (!scrollAnimationId.current) {
             // Marca que el scroll fue externo
             isExternalScroll.current = true;
             // Sincroniza ambas posiciones con la posición actual del navegador
             currentScrollY.current = window.scrollY;
             targetScrollY.current = window.scrollY;
         }
     };

    // Añade los listeners al montar o habilitar
    // passive: false es necesario en 'wheel' para poder llamar a preventDefault()
    window.addEventListener('wheel', handleWheel, { passive: false });
    // passive: true es seguro para 'scroll' ya que no prevenimos su comportamiento
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Función de limpieza que se ejecuta al desmontar o deshabilitar
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      // Cancela cualquier animación pendiente
      if (scrollAnimationId.current) {
        cancelAnimationFrame(scrollAnimationId.current);
      }
    };
  }, [isEnabled, damping]); // El efecto se re-ejecuta si isEnabled o damping cambian
};

export default useSmoothScroll;
