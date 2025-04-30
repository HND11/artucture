// src/hooks/useDisableBodyScroll.js
import { useRef, useCallback, useEffect } from 'react';

// Hook personalizado para deshabilitar y habilitar el scroll del body
const useDisableBodyScroll = () => {
  // Refs para guardar el estado original y la posición de scroll
  const scrollY = useRef(0);
  const originalStyles = useRef({});
  const isLocked = useRef(false); // Para evitar múltiples bloqueos/desbloqueos

  // Función para deshabilitar el scroll
  const disableScroll = useCallback(() => {
    // Evita bloquear si ya está bloqueado
    if (isLocked.current) return;

    // Guarda la posición de scroll actual
    scrollY.current = window.scrollY;

    // Guarda los estilos originales del body y html (para overflow y scroll-behavior)
    originalStyles.current = {
        bodyOverflow: document.body.style.overflow,
        bodyPosition: document.body.style.position,
        bodyWidth: document.body.style.width,
        bodyTop: document.body.style.top,
        htmlScrollBehavior: document.documentElement.style.scrollBehavior,
    };

    // Aplica estilos para bloquear el scroll
    document.body.style.overflow = 'hidden';
    // Usar 'fixed' puede causar saltos de layout si el contenido no ocupa toda la altura.
    // 'relative' con 'overflow: hidden' suele ser más seguro.
    document.body.style.position = 'relative'; // O 'fixed' si es necesario y manejas el layout
    document.body.style.width = '100%';
    // Si usas 'fixed', necesitas el 'top' negativo:
    // document.body.style.top = `-${scrollY.current}px`;
    // Deshabilita el scroll-behavior temporalmente para evitar saltos al restaurar
    document.documentElement.style.scrollBehavior = 'auto';

    isLocked.current = true; // Marca como bloqueado
  }, []);

  // Función para habilitar el scroll
  const enableScroll = useCallback(() => {
    // Evita desbloquear si no está bloqueado
    if (!isLocked.current) return;

    // Restaura los estilos originales
    document.body.style.overflow = originalStyles.current.bodyOverflow || '';
    document.body.style.position = originalStyles.current.bodyPosition || '';
    document.body.style.width = originalStyles.current.bodyWidth || '';
    document.body.style.top = originalStyles.current.bodyTop || '';
    document.documentElement.style.scrollBehavior = originalStyles.current.htmlScrollBehavior || '';

    // Restaura la posición de scroll original (solo si no se usó 'fixed' con 'top')
    // Si usaste 'fixed', el navegador debería recordar la posición al quitar 'fixed'.
    // Si usaste 'relative', puede ser necesario restaurarla explícitamente si hubo algún cambio.
    // window.scrollTo(0, scrollY.current); // Descomenta si es necesario

    isLocked.current = false; // Marca como desbloqueado
  }, []);

  // Efecto para asegurarse de habilitar el scroll si el componente se desmonta mientras está bloqueado
  useEffect(() => {
    // Retorna una función de limpieza que se ejecuta al desmontar
    return () => {
      if (isLocked.current) {
        enableScroll();
      }
    };
  }, [enableScroll]); // Depende de enableScroll

  // Retorna las funciones para ser usadas por otros componentes
  return { disableScroll, enableScroll };
};

export default useDisableBodyScroll;
