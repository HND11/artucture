// src/pages/AboutPage.jsx
// ACTUALIZADO: Datos de la empresa integrados desde enterprise data.txt (CITAS REMOVIDAS DEL TEXTO)

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

// --- Componentes Placeholder ---
const secondaryTextColorClass = "text-[color:color-mix(in_srgb,_var(--text),_transparent_30%)]";
const borderColorClass = "border-[color:color-mix(in_srgb,_var(--text),_transparent_90%)]";
const valuesHoverBg = "hover:bg-[color:color-mix(in_srgb,_var(--secondary),_transparent_20%)]";
const TextFeatureSection = ({ title, subtitle, titleSize, subtitleSize, subtitleColor }) => (
  <div>
    <h1 className={`${titleSize} text-[var(--text)]`}>{title}</h1>
    {subtitle && <p className={`${subtitleSize} ${secondaryTextColorClass} mt-4`}>{subtitle}</p>}
  </div>
);

// --- Datos de la empresa actualizados (Sin citas en el texto) ---
const aboutData = {
    history: "La historia comenzó cuando Hendrick y Cristal decidieron que ya era el momento de construir la casa de sus sueños. Más que un lugar donde vivir, buscaban crear un espacio que reflejara sus ideales: funcionalidad, estética y, sobre todo, calidez. Fue durante este proceso de imaginar y diseñar su hogar que encontraron la inspiración para lanzar su propio estudio. Así nació la idea de Artucture, una empresa dedicada a la arquitectura y el diseño de interiores. El hogar que soñaban era un espacio fluido, lleno de luz natural, materiales orgánicos y detalles cuidadosamente diseñados para ser visualmente atractivos, prácticos y duraderos. A medida que avanzaban en la planificación y construcción, su enfoque único comenzó a captar la atención de familiares y amigos. Lo que inició como simples preguntas y solicitudes de consejos pronto se transformó en encargos de remodelaciones y proyectos completos. Así, un sueño personal se convirtió en una misión profesional: ayudar a otros a construir los espacios que siempre habían imaginado. Desde el inicio, Hendrick y Cristal combinaron perfectamente sus talentos. Hendrick, con su precisión técnica y su enfoque meticuloso en la estructura y planificación, complementaba el estilo creativo y artístico de Cristal, quien tiene un don para transformar cualquier espacio en un lugar vibrante y lleno de vida. Esta sinergia les permitió, el 7 de marzo de 2019, construir Artucture, una empresa que no solo diseña hogares, sino que crea ambientes que cuentan historias, reflejando la esencia de quienes los habitan. Hoy, Artucture es un referente en el diseño de interiores y la arquitectura moderna. Sus proyectos abarcan desde hogares particulares hasta espacios comerciales, todos caracterizados por un enfoque innovador y sostenible. La empresa se distingue por integrar tecnología avanzada, como renders 3D y realidad virtual, y por trabajar de la mano con sus clientes para asegurar que cada detalle sea único y significativo. Hendrick y Cristal continúan trabajando codo a codo, diseñando espacios que son mucho más que funcionales o bellos: son extensiones de los sueños y aspiraciones de quienes los habitan. Y así, la historia de Artucture sigue evolucionando, construyendo no solo casas, sino también sueños que perduran en el tiempo.",
    mission: "Transformar los sueños de nuestros clientes en espacios únicos y extraordinarios a través de un diseño innovador, funcional y sostenible. Nos especializamos en crear soluciones arquitectónicas personalizadas que integren tecnología moderna, respeto por el medio ambiente, y un enfoque en la armonía entre el hábitat natural y social. Buscamos aprovechar las características únicas de cada lugar para diseñar ambientes que sean visualmente impactantes, prácticos y pensados para perdurar en el tiempo.",
    vision: "Convertirnos en la empresa líder en arquitectura y diseño de interiores en la República Dominicana, siendo la primera opción tanto para quienes desean construir el hogar de sus sueños como para empresas que buscan proyectos innovadores, funcionales y estéticamente impactantes.",
    values: ["Esfuerzo", "Colaboración", "Pasión", "Responsabilidad", "Servicio"],
    team: [
        { name: "Hendrick Gómez", role: "Co-Fundador, Director General (CEO), Arquitecto Principal", image: "/team/hendrick_gomez.jpg" },
        { name: "Cristal Corniel", role: "Co-Fundadora, Directora de Diseño Interior", image: "/team/cristal_corniel.jpg" },
        { name: "Amanda Hernández", role: "Gerente de Proyectos Senior / Coordinadora General", image: "/team/amanda_hernandez.jpg" },
        { name: "Angel Suárez", role: "Director de Operaciones / Líder de Construcción", image: "/team/angel_suarez.jpg" },
        { name: "Jeremy Antigua", role: "Arquitecto Senior / Líder de Diseño Arquitectónico", image: "/team/jeremy_antigua.jpg" },
        { name: "Isaac Jiménez", role: "Arquitecto Junior / Asistente de Diseño", image: "/team/isaac_jimenez.jpg" },
        // Añadir más miembros según la lista completa si es necesario
    ]
};

// --- Variantes de Animación (Otras) ---
const itemFadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }};
const hoverTransition = { duration: 0.4, ease: "easeInOut" };

// --- Helper URL ---
const base = import.meta.env.BASE_URL || '/';
const placeholderBg = '#0a0f19';
const placeholderText = '#f1f1ee';
const getImageUrl = (path, placeholder = `https://placehold.co/200x200/${placeholderBg.substring(1)}/${placeholderText.substring(1)}?text=Team`) => {
    if (!path) return placeholder;
    const imagePath = path.startsWith('/') ? path.substring(1) : path;
    const finalPath = imagePath || placeholder;
    return finalPath.startsWith('http') ? finalPath : `${base}${imagePath}`.replace(/\/+/g, '/');
};

function AboutPage() {
  useSmoothScroll(true, 0.06);
  const [teamImagesLoaded, setTeamImagesLoaded] = useState(false);

  // Preload team images
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

      Promise.all(imagePromises)
        .then(() => setTeamImagesLoaded(true))
        .catch(() => setTeamImagesLoaded(true));
    };

    preloadTeamImages();
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
        key="about-page"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageTransitionVariants}
        className="min-h-screen font-sans antialiased bg-[var(--background)] text-[var(--text)]"
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
          <p className={`text-lg md:text-xl lg:text-2xl tracking-wide mt-4 ${secondaryTextColorClass}`}>Conoce nuestra historia, filosofía y al equipo detrás de Artucture.</p>
        </div>
      </motion.div>

      {/* History Section */}
      {aboutData.history && (
        <ScrollAnimatedSection
          className="container mx-auto px-6 sm:px-10 md:px-20 py-24 md:py-32 lg:py-40"
          initial="visible"
          animate="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
             <div className="md:col-span-1">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[var(--text)] leading-tight">Nuestra Trayectoria</h2>
             </div>
             <div className="md:col-span-2">
                <p className={`text-xl md:text-2xl ${secondaryTextColorClass} leading-relaxed`}>
                    {aboutData.history}
                </p>
             </div>
           </div>
        </ScrollAnimatedSection>
      )}

      {/* Mission & Vision Section */}
      {(aboutData.mission || aboutData.vision) && (
        <ScrollAnimatedSection
            className="py-24 md:py-32 lg:py-40 bg-[var(--secondary)]/50"
            initial="visible"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
           <div className="container mx-auto px-6 sm:px-10 md:px-20">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                 {aboutData.mission && (
                    <motion.div
                      variants={itemFadeUpVariants}
                      initial="visible"
                      animate="visible"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[var(--text)]">Misión</h3>
                        <p className={`text-xl md:text-2xl ${secondaryTextColorClass} leading-relaxed`}>{aboutData.mission}</p>
                    </motion.div>
                 )}
                 {aboutData.vision && (
                    <motion.div
                      variants={itemFadeUpVariants}
                      initial="visible"
                      animate="visible"
                    >
                        <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[var(--text)]">Visión</h3>
                        <p className={`text-xl md:text-2xl ${secondaryTextColorClass} leading-relaxed`}>{aboutData.vision}</p>
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
               <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-[var(--text)]">Nuestros Valores</h2>
               <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                   {aboutData.values.map((value, index) => (
                       <motion.li
                          key={index}
                          className={`bg-[var(--secondary)] p-8 rounded-4xl shadow-lg border ${borderColorClass} flex items-center justify-center aspect-square group ${valuesHoverBg} transition-colors`}
                          variants={itemFadeUpVariants}
                          initial={index < 2 ? "visible" : "hidden"}
                          animate={index < 2 ? "visible" : undefined}
                          whileInView={index >= 2 ? "visible" : undefined}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: index * 0.05, ...itemFadeUpVariants.visible.transition }}
                          whileHover={{ scale: 0.97 }}
                          whileTap={{ scale: 0.95 }}
                        >
                           <span className="text-xl font-semibold text-[var(--text)] transition-transform duration-300 group-hover:scale-105">{value}</span>
                       </motion.li>
                   ))}
               </ul>
           </div>
        </ScrollAnimatedSection>
      )}

      {/* Team Section */}
      {aboutData.team && Array.isArray(aboutData.team) && aboutData.team.length > 0 && (
        <ScrollAnimatedSection
            className="py-24 md:py-32 lg:py-40 bg-[var(--secondary)]/50"
            initial="visible"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
           <div className="container mx-auto px-6 sm:px-10 md:px-20">
             <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--text)]">Conoce al Equipo</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
               {aboutData.team.map((member, index) => (
                   <motion.div
                     key={member.name}
                     className="text-center group"
                     variants={itemFadeUpVariants}
                     initial={index < 2 ? "visible" : "hidden"}
                     animate={index < 2 ? "visible" : undefined}
                     whileInView={index >= 2 ? "visible" : undefined}
                     viewport={{ once: true, amount: 0.2 }}
                     transition={{ delay: index * 0.1, ...itemFadeUpVariants.visible.transition }}
                   >
                       <motion.div
                         className={`w-48 h-48 lg:w-56 lg:h-56 mx-auto mb-5 rounded-full overflow-hidden bg-[var(--secondary)] shadow-md border ${borderColorClass} relative`}
                         whileHover={{ scale: 1.05, boxShadow: "var(--tw-shadow-xl)" }}
                         whileTap={{ scale: 0.98 }}
                         transition={hoverTransition}
                       >
                           {!teamImagesLoaded && (
                             <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"></div>
                           )}
                           <img
                             src={getImageUrl(member.image)}
                             alt={member.name}
                             className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${teamImagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                             onError={(e) => {
                               e.target.onerror = null;
                               e.target.src = getImageUrl(null);
                               e.target.style.opacity='1';
                               e.target.parentElement.style.backgroundColor = 'var(--secondary)';
                             }}
                           />
                       </motion.div>
                       <h4 className="text-xl lg:text-2xl font-semibold text-[var(--text)] mt-4">{member.name}</h4>
                       <p className={`${secondaryTextColorClass} text-base lg:text-lg`}>{member.role}</p>
                   </motion.div>
               ))}
             </div>
           </div>
        </ScrollAnimatedSection>
      )}

      <Footer />
    </motion.div>
  );
}

export default AboutPage;