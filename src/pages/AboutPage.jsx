// src/pages/AboutPage.jsx
// ACTUALIZADO: Corregido error "placeholderBg is not defined" en getImageUrl.
// Visión restaurada al original, Misión ajustada a longitud similar.
// Layout de Historia ajustado (Título arriba). Sin padding extra al final.

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';
import Footer from '../components/Footer';
import useSmoothScroll from '../hooks/useSmoothScroll';

// --- Variantes de Transición de Página Suaves ---
const pageTransitionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } }
};

// --- Clases de Estilo Reutilizables ---
const secondaryTextColorClass = "text-[color:color-mix(in_srgb,_var(--text),_transparent_35%)]";
const borderColorClass = "border-[color:color-mix(in_srgb,_var(--text),_transparent_90%)]";
const valuesHoverBg = "hover:bg-[color:color-mix(in_srgb,_var(--secondary),_transparent_20%)]";
const readableTextStyle = `text-xl md:text-2xl ${secondaryTextColorClass} leading-relaxed md:leading-loose`;

// --- Datos de la empresa actualizados ---
const aboutData = {
    historySummary: [ // Historia resumida en párrafos
        "Todo comenzó con un sueño personal: Hendrick y Cristal buscando construir su propio hogar, un espacio que reflejara funcionalidad, estética y calidez. Durante ese proceso creativo, descubrieron la inspiración para fundar Artucture, su propio estudio de arquitectura y diseño de interiores.",
        "Lo que inició como consejos a familiares y amigos pronto evolucionó. Su visión única —espacios fluidos, luz natural, materiales orgánicos y diseño práctico y duradero— captó la atención, transformando su sueño personal en una misión profesional: ayudar a otros a materializar los espacios que siempre imaginaron.",
        "La sinergia fue clave. La precisión técnica de Hendrick complementó el estilo creativo y artístico de Cristal. Juntos, el 7 de marzo de 2019, dieron vida a Artucture, una empresa que va más allá de diseñar hogares; crea ambientes que cuentan historias y reflejan la esencia de quienes los habitan.",
        "Hoy, Artucture es un referente en diseño y arquitectura moderna en la República Dominicana. Desde hogares hasta espacios comerciales, cada proyecto se distingue por su enfoque innovador, sostenible y la integración de tecnología como renders 3D y RV, siempre trabajando de cerca con el cliente para asegurar que cada detalle sea único y significativo."
    ],
    // --- MISIÓN (Ajustada a longitud similar a Visión original) ---
    mission: "Transformar los sueños de nuestros clientes en espacios únicos y extraordinarios a través de un diseño innovador, funcional y sostenible. Creamos soluciones arquitectónicas personalizadas que integran tecnología moderna, respeto ambiental y armonía entre hábitat natural y social.",
    // --- VISIÓN (Restaurada al texto original de enterprise data.txt) ---
    vision: "Convertirnos en la empresa líder en arquitectura y diseño de interiores en la República Dominicana, siendo la primera opción tanto para quienes desean construir el hogar de sus sueños como para empresas que buscan proyectos innovadores, funcionales y estéticamente impactantes.",
    values: ["Esfuerzo", "Colaboración", "Pasión", "Responsabilidad", "Servicio"],
    team: [
        { name: "Hendrick Gómez", role: "Co-Fundador, Director General (CEO), Arquitecto Principal", image: "/team/hendrick_gomez.jpg" },
        { name: "Cristal Corniel", role: "Co-Fundadora, Directora de Diseño Interior", image: "/team/cristal_corniel.jpg" },
        { name: "Amanda Hernández", role: "Gerente de Proyectos Senior / Coordinadora General", image: "/team/amanda_hernandez.jpg" },
        { name: "Angel Suárez", role: "Director de Operaciones / Líder de Construcción", image: "/team/angel_suarez.jpg" },
        { name: "Jeremy Antigua", role: "Arquitecto Senior / Líder de Diseño Arquitectónico", image: "/team/jeremy_antigua.jpg" },
        { name: "Isaac Jiménez", role: "Arquitecto Junior / Asistente de Diseño", image: "/team/isaac_jimenez.jpg" },
    ]
};

// --- Variantes de Animación (Otras) ---
const itemFadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }};
const hoverTransition = { duration: 0.4, ease: "easeInOut" };

// --- Helper URL ---
// **CORRECCIÓN:** Declarar variables de placeholder ANTES de usarlas en el valor por defecto
const placeholderBg = '#0a0f19';
const placeholderText = '#f1f1ee';

const getImageUrl = (path, placeholder = `https://placehold.co/200x200/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Team`) => {
    // Ahora placeholderBg y placeholderText están definidas cuando se evalúa el placeholder por defecto

    if (!path) return placeholder; // Si no hay path, devuelve el placeholder construido
    if (path.startsWith('http') || path.startsWith('https://placehold.co')) {
        return path; // Si ya es absoluta o placeholder, devolverla tal cual
    }
    // Usa la versión simplificada que devuelve path relativo a la raíz
    return path.startsWith('/') ? path : `/${path}`;
};


function AboutPage() {
  useSmoothScroll(true, 0.06);
  const [teamImagesLoaded, setTeamImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadTeamImages = () => {
      if (!aboutData.team || !Array.isArray(aboutData.team)) {
        setTeamImagesLoaded(true);
        return;
      }
      const imagesToPreload = aboutData.team.map(member => getImageUrl(member.image));
      const imagePromises = imagesToPreload.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      Promise.all(imagePromises).finally(() => setTeamImagesLoaded(true));
    };
    preloadTeamImages();
    window.scrollTo(0, 0);
  }, []);

  return (
    // Contenedor principal SIN el padding inferior extra
    <motion.div
        key="about-page"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransitionVariants}
        className="min-h-screen font-sans antialiased bg-[var(--background)] text-[var(--text)]" // Sin pb-8
    >
      <Header />

      {/* Hero Section */}
      <motion.div
        className="pt-32 pb-24 md:pt-48 md:pb-32 bg-[var(--secondary)]/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="container mx-auto px-6 sm:px-10 md:px-20 text-center">
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-[var(--text)]`}>Sobre Nosotros</h1>
          <p className={`text-lg md:text-xl lg:text-2xl tracking-wide mt-6 ${secondaryTextColorClass}`}>
            Conoce nuestra historia, filosofía y al equipo detrás de Artucture.
          </p>
        </div>
      </motion.div>

      {/* History Section REESTRUCTURADA */}
      {aboutData.historySummary && aboutData.historySummary.length > 0 && (
        <ScrollAnimatedSection
          className="container mx-auto px-6 sm:px-10 md:px-20 py-24 md:py-32 lg:py-40"
          initial="visible"
          animate="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
           <div className="max-w-4xl mx-auto">
             <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 md:mb-16 text-[var(--text)] text-center leading-tight"
                variants={itemFadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                Nuestra Trayectoria
              </motion.h2>
             <motion.div
               className="space-y-6 md:space-y-8"
               variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.1 }}
             >
                {aboutData.historySummary.map((paragraph, index) => (
                  <motion.p key={index} className={readableTextStyle} variants={itemFadeUpVariants}>
                    {paragraph}
                  </motion.p>
                ))}
             </motion.div>
           </div>
        </ScrollAnimatedSection>
      )}

      {/* Mission & Vision Section (Textos actualizados) */}
      {(aboutData.mission || aboutData.vision) && (
        <ScrollAnimatedSection
            className="py-24 md:py-32 lg:py-40 bg-[var(--secondary)]/50"
            initial="visible"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
           <div className="container mx-auto px-6 sm:px-10 md:px-20">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
                 {/* Columna Misión */}
                 {aboutData.mission && (
                    <motion.div
                      variants={itemFadeUpVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[var(--text)]">Misión</h3>
                        <p className={readableTextStyle}>{aboutData.mission}</p>
                    </motion.div>
                 )}
                 {/* Columna Visión */}
                 {aboutData.vision && (
                    <motion.div
                      variants={itemFadeUpVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[var(--text)]">Visión</h3>
                        <p className={readableTextStyle}>{aboutData.vision}</p>
                    </motion.div>
                 )}
             </div>
           </div>
         </ScrollAnimatedSection>
      )}

      {/* Values Section */}
      {aboutData.values && aboutData.values.length > 0 && (
        <ScrollAnimatedSection
            className="container mx-auto px-6 sm:px-10 md:px-20 py-24 md:py-32 lg:py-40"
            initial="visible"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div>
               <motion.h2
                 className="text-4xl md:text-5xl font-bold mb-20 text-center text-[var(--text)]"
                 variants={itemFadeUpVariants}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0.5 }}
               >
                 Nuestros Valores
               </motion.h2>
               <motion.ul
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center"
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                   {aboutData.values.map((value, index) => (
                       <motion.li
                          key={index}
                          className={`bg-[var(--secondary)] p-8 rounded-4xl shadow-lg border ${borderColorClass} flex items-center justify-center aspect-square group ${valuesHoverBg} transition-colors`}
                          variants={itemFadeUpVariants}
                          whileHover={{ scale: 0.97, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.95 }}
                        >
                           <span className="text-xl font-semibold text-[var(--text)] transition-transform duration-300 group-hover:scale-105">{value}</span>
                       </motion.li>
                   ))}
               </motion.ul>
           </div>
        </ScrollAnimatedSection>
      )}

      {/* Team Section */}
      {aboutData.team && Array.isArray(aboutData.team) && aboutData.team.length > 0 && (
         <ScrollAnimatedSection
            className="py-24 md:py-32 lg:py-40 bg-[var(--secondary)]/50"
            initial="visible"
            animate="visible"
            viewport={{ once: true, amount: 0.05 }}
         >
           <div className="container mx-auto px-6 sm:px-10 md:px-20">
             <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-20 text-[var(--text)]"
                variants={itemFadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
             >
                Conoce al Equipo
             </motion.h2>
             <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
               {aboutData.team.map((member) => (
                   <motion.div
                     key={member.name}
                     className="text-center group"
                     variants={itemFadeUpVariants}
                   >
                       <motion.div
                         className={`w-48 h-48 lg:w-56 lg:h-56 mx-auto mb-5 rounded-full overflow-hidden bg-[var(--secondary)] shadow-md border ${borderColorClass} relative`}
                         whileHover={{ scale: 1.05, boxShadow: "var(--tw-shadow-xl)" }}
                         whileTap={{ scale: 0.98 }}
                         transition={hoverTransition}
                       >
                           {!teamImagesLoaded && (
                             <div className="absolute inset-0 bg-[color:color-mix(in_srgb,_var(--secondary),_transparent_50%)] animate-pulse rounded-full"></div>
                           )}
                           <img
                             src={getImageUrl(member.image)}
                             alt={member.name}
                             loading="lazy"
                             className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${teamImagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                             onError={(e) => {
                               e.target.onerror = null; // Previene loop infinito si el placeholder también falla
                               e.target.src = getImageUrl(null); // Intenta cargar el placeholder
                               e.target.style.opacity='1'; // Asegura que sea visible si carga
                             }}
                           />
                       </motion.div>
                       <h4 className="text-xl lg:text-2xl font-semibold text-[var(--text)] mt-4">{member.name}</h4>
                       <p className={`${secondaryTextColorClass} text-base lg:text-lg mt-1`}>{member.role}</p>
                   </motion.div>
               ))}
             </motion.div>
           </div>
        </ScrollAnimatedSection>
      )}

      <Footer />
    </motion.div>
  );
}

export default AboutPage;