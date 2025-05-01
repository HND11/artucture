// src/data/ProjectData.js

// --- INICIO: Funciones y Lógica para Slugs ---

// Función para crear "slugs" amigables para URLs a partir de texto.
// Asegura minúsculas, sin acentos, espacios reemplazados por guiones,
// y elimina caracteres no válidos.
function createSlug(text) {
  if (!text) return `project-${Math.random().toString(36).substring(7)}`; // Genera un ID aleatorio si no hay texto
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Separa acentos (ej. 'á' -> 'a' + '´')
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (acentos)
    .replace(/\s+/g, '-') // Reemplaza espacios (uno o más) con un solo guion
    .replace(/[^\w-]+/g, '') // Elimina caracteres que no sean palabras, números o guiones
    .replace(/--+/g, '-') // Reemplaza múltiples guiones seguidos por uno solo
    .replace(/^-+/, '') // Elimina guiones al principio del string
    .replace(/-+$/, ''); // Elimina guiones al final del string
}

// Datos originales de los proyectos (antes de aplicar slugs)
// Usamos la versión previamente modificada con ubicaciones ajustadas (más Santiago, 2 SD)
const originalProjectsData = {
  page1: { // Sinfonía Verde - Jarabacoa
    projectName: "Sinfonía Verde",
    title: "Inmersión en la Naturaleza Dominicana",
    image: "/sinfonia-verde-principal.png",
    thumbnail: "/sinfonia-verde-principal.png",
    description: "Una residencia autosuficiente que se integra armónicamente en la biodiversidad de las montañas de Jarabacoa, República Dominicana.",
    uniqueText: "En las alturas de Jarabacoa, un claro natural permitió construir un hogar sin conexión a la red eléctrica, rodeado por el vibrante bosque nuboso. Inspirada en la complejidad del entorno, la casa adopta una forma circular con un óculo central, ofreciendo una experiencia panorámica que conecta con la naturaleza circundante.",
    details: [
      { label: "Ubicación", value: "Jarabacoa, La Vega, República Dominicana" },
      { label: "Área", value: "400 m²" },
      { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitecto Principal / Co-Fundador", value: "Hendrick Gómez" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Soporte Técnico (Instalaciones)", value: "Pedro Abreu" }
    ],
    gallery: [
      { image: "/sinfonia-verde-1.png", title: "Vista Exterior Elevada", description: "La estructura principal se eleva sobre pilotes delgados..." }, { image: "/sinfonia-verde-2.png", title: "Óculo Central: Conexión Celestial", description: "El diseño circular incluye un óculo central abierto..." }, { image: "/sinfonia-verde-3.png", title: "Interiores Abiertos a la Naturaleza", description: "Los espacios interiores fluyen sin divisiones rígidas..." }, { image: "/sinfonia-verde-4.png", title: "Techo Hiperbólico Funcional", description: "El distintivo techo con forma de paraboloide hiperbólico..." }, { image: "/sinfonia-verde-5.png", title: "Pasarelas Elevadas y Ligeras", description: "Las diferentes áreas de la casa y el acceso se conectan..." }, { image: "/sinfonia-verde-6.png", title: "Detalle Materiales Sostenibles", description: "Primer plano de las juntas y acabados..." }
    ],
    insights: { vision: "Diseñar una vivienda que se sumerja en los sonidos...", challenge: "Construir en una ubicación remota..." }
  },
  page2: { // Gardenia Apartments - Las Terrenas
    projectName: "Gardenia Apartments",
    title: "Residencias Tropicales en Las Terrenas",
    image: "/gardenia-apartments-principal.png",
    thumbnail: "/gardenia-apartments-principal.png",
    description: "Complejo residencial que fusiona diseño contemporáneo con la exuberancia natural de Las Terrenas, Samaná.",
    uniqueText: "Ubicado en la costa atlántica de República Dominicana, Gardenia Apartments ofrece una experiencia de vida que armoniza...",
    details: [
      { label: "Ubicación", value: "Las Terrenas, Samaná, República Dominicana" }, { label: "Área", value: "1,200 m²" }, { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Asistente de Diseño", value: "Isaac Jiménez" }, { label: "Delineante / Asistente Técnico", value: "Ramón García" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }
    ],
    gallery: [
      { image: "/gardenia-1.png", title: "Fachada Principal Integrada", description: "La arquitectura del edificio dialoga con el entorno..." }, { image: "/gardenia-2.png", title: "Espacios Interiores Ventilados", description: "El diseño interior se enfoca en maximizar la entrada de luz..." }, { image: "/gardenia-3.png", title: "Áreas Comunes Exuberantes", description: "Las zonas comunes, incluyendo piscinas y jardines..." }, { image: "/gardenia-4.png", title: "Terrazas como Extensión Vital", description: "Cada unidad cuenta con amplias terrazas privadas..." }, { image: "/gardenia-5.png", title: "Detalle de Materiales Locales", description: "Se aprecia el uso de maderas de origen local..." }
    ],
    insights: { vision: "Crear un espacio residencial que respete...", challenge: "Diseñar en un entorno tropical costero..." }
  },
  page3: { // Villa Aurea - Cap Cana
    projectName: "Villa Aurea",
    title: "Refugio Dorado en Cap Cana",
    image: "/villa-aurea-principal.png",
    thumbnail: "/villa-aurea-principal.png",
    description: "Residencia privada que combina lujo y sostenibilidad en el exclusivo entorno de Cap Cana.",
    uniqueText: "Villa Aurea se erige como un santuario moderno que abraza el paisaje tropical de Punta Cana...",
    details: [
      { label: "Ubicación", value: "Cap Cana, Punta Cana, República Dominicana" }, { label: "Área", value: "800 m²" }, { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Visualizadora 3D", value: "Esmeilyn Peralta" }
    ],
    gallery: [
      { image: "/villa-aurea-1.png", title: "Vista Exterior Armoniosa", description: "La fachada combina elegantemente materiales..." }, { image: "/villa-aurea-2.png", title: "Piscina Infinita con Vistas", description: "La espectacular piscina de borde infinito..." }, { image: "/villa-aurea-3.png", title: "Interiores Abiertos y Luminosos", description: "Los espacios interiores se caracterizan por su amplitud..." }, { image: "/villa-aurea-4.png", title: "Terrazas Cubiertas Integradas", description: "Generosas terrazas cubiertas extienden las áreas..." }, { image: "/villa-aurea-5.png", title: "Detalle Diseño Bioclimático", description: "Se observan elementos como aleros pronunciados..." }
    ],
    insights: { vision: "Diseñar una residencia que ofrezca lujo...", challenge: "Integrar tecnologías modernas..." }
  },
   page4: { // Pergola House - Sosúa
    projectName: "Pergola House",
    title: "Casa entre Sombras y Luz Caribeña",
    image: "/pergola-house-principal.png",
    thumbnail: "/pergola-house-principal.png",
    description: "Residencia en Sosúa que utiliza pérgolas para jugar con la luz tropical y crear espacios dinámicos.",
    uniqueText: "Pergola House explora la interacción entre estructuras arquitectónicas y la intensa luz natural del Caribe...",
    details: [
      { label: "Ubicación", value: "Sosúa, Puerto Plata, República Dominicana" }, { label: "Área", value: "350 m²" }, { label: "Año de finalización", value: "2021" }
    ],
    team: [
      { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Asistente de Diseño", value: "Isaac Jiménez" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }
    ],
    gallery: [
      { image: "/pergola-house-1.png", title: "Fachada Dinámica con Pérgolas", description: "El diseño de la fachada se define por la extensa estructura..." }, { image: "/pergola-house-2.png", title: "Espacios Interiores Iluminados", description: "La luz natural penetra en los interiores de forma controlada..." }, { image: "/pergola-house-3.png", title: "Conexión Interior-Exterior Fluida", description: "Las áreas sociales se abren completamente hacia terrazas..." }, { image: "/pergola-house-4.png", title: "Detalle Constructivo de Pérgola", description: "Vista cercana de la estructura de las pérgolas..." }
    ],
    insights: { vision: "Crear una vivienda que utilice elementos arquitectónicos...", challenge: "Diseñar pérgolas que sean estéticamente agradables..." }
  },
  page5: { // Hug House - Santiago
    projectName: "Hug House",
    title: "Casa del Abrazo en Santiago",
    image: "/hug-house-principal.png",
    thumbnail: "/hug-house-principal.png",
    description: "Residencia en Santiago que envuelve a sus habitantes en un diseño cálido y acogedor.",
    uniqueText: "Hug House se concibe como un espacio que abraza a sus ocupantes, utilizando curvas suaves...",
    details: [
      { label: "Ubicación", value: "Cerros de Gurabo, Santiago, República Dominicana" }, { label: "Área", value: "250 m²" }, { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Arquitecto Senior", value: "Jeremy Antigua" }, { label: "Diseño Interior", value: "Cristal Corniel" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }
    ],
    gallery: [
      { image: "/hug-house-1.png", title: "Fachada Curva y Protectora", description: "El diseño exterior se caracteriza por sus suaves líneas curvas..." }, { image: "/hug-house-2.png", title: "Interiores Acogedores y Táctiles", description: "El uso predominante de maderas claras y texturas suaves..." }, { image: "/hug-house-3.png", title: "Espacios Familiares Fluidos", description: "Las áreas comunes están diseñadas para la convivencia familiar..." }, { image: "/hug-house-4.png", title: "Juego de Luces en Superficies Curvas", description: "La incidencia de la luz natural sobre las paredes..." }, { image: "/hug-house-5.png", title: "Conexión Gradual con el Jardín", description: "Aberturas y patios interiores conectan sutilmente..." }, { image: "/hug-house-6.png", title: "Detalle de Carpintería Orgánica", description: "El mobiliario integrado y los detalles de carpintería..." }
    ],
    insights: { vision: "Diseñar una casa que proporcione un refugio emocional...", challenge: "Integrar formas curvas en la construcción residencial..." }
  },
  page6: { // Apartamento Colonial - Zona Colonial, SD
    projectName: "Apartamento Colonial Renovado",
    title: "Apartamento Histórico en la Zona Colonial",
    image: "/plazuela-santiago-principal.png",
    thumbnail: "/plazuela-santiago-principal.png",
    description: "Renovación de un apartamento en un edificio histórico de la Zona Colonial, combinando elementos tradicionales y contemporáneos.",
    uniqueText: "Este proyecto transforma un apartamento en la histórica Zona Colonial de Santo Domingo...",
    details: [
      { label: "Ubicación", value: "Zona Colonial, Santo Domingo, República Dominicana" }, // Ubicación SD mantenida
      { label: "Área", value: "90 m²" }, { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitecto Principal", value: "Hendrick Gómez" }, { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Diseñadora Interiores Jr.", value: "Rosa Capellán" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Técnico Acabados / Instalador", value: "Saul Peña" }
    ],
    gallery: [
      { image: "/plazuela-santiago-1.png", title: "Salón Renovado con Carácter", description: "El salón principal muestra una equilibrada combinación..." }, { image: "/plazuela-santiago-2.png", title: "Cocina Abierta y Moderna", description: "La cocina se integra al área social con un diseño abierto..." }, { image: "/plazuela-santiago-3.png", title: "Dormitorio Principal Acogedor", description: "Se genera un ambiente cálido y sereno en el dormitorio..." }, { image: "/plazuela-santiago-4.png", title: "Encuentro Respetuoso de Épocas", description: "Detalle constructivo que evidencia el cuidadoso diálogo..." }, { image: "/plazuela-santiago-5.png", title: "Suelos Originales Restaurados", description: "Vista de los suelos de madera o baldosa hidráulica..." }
    ],
    insights: { vision: "Fusionar la rica historia del edificio colonial...", challenge: "Mantener la integridad estructural..." }
  },
  page7: { // Centro Educativo - Mirador Sur, Santiago (Ubicación cambiada)
    projectName: "Centro Educativo Mirador",
    title: "Centro de Ciencias y Medio Ambiente",
    image: "/nueva-school-principal.png",
    thumbnail: "/nueva-school-principal.png",
    description: "Edificio educativo en Santiago que promueve el aprendizaje sostenible y la conexión con la naturaleza.",
    uniqueText: "El Centro de Ciencias y Medio Ambiente de este colegio está diseñado para inspirar a los estudiantes...",
    details: [
      { label: "Ubicación", value: "Mirador Sur, Santiago, República Dominicana" }, // Ubicación cambiada a Santiago
      { label: "Área", value: "2,000 m²" }, { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Gerente de Proyecto / Coord. General", value: "Amanda Hernández" }, { label: "Director de Operaciones", value: "Angel Suárez" }, { label: "Asesora Legal / Permisos", value: "Sofía de la Cruz" }
    ],
    gallery: [
      { image: "/nueva-school-1.png", title: "Fachada Integrada al Entorno", description: "El diseño exterior utiliza materiales naturales..." }, { image: "/nueva-school-2.png", title: "Laboratorios Flexibles y Modernos", description: "Los espacios de laboratorio son luminosos..." }, { image: "/nueva-school-3.png", title: "Áreas Comunes para Colaborar", description: "Zonas de encuentro informales y espacios de estudio..." }, { image: "/nueva-school-4.png", title: "Aulas Abiertas al Aprendizaje Exterior", description: "Las aulas cuentan con grandes ventanales..." }, { image: "/nueva-school-5.png", title: "Sostenibilidad como Herramienta Educativa", description: "El edificio incorpora estrategias de diseño sostenible..." }
    ],
    insights: { vision: "Crear un entorno educativo que refleje los valores...", challenge: "Diseñar un edificio educativo que cumpla..." }
  },
  page8: { // Alica Bakery - Piantini, SD
    projectName: "Alica Bakery SD",
    title: "Panadería Contemporánea en Piantini",
    image: "/alica-bakery-principal.png",
    thumbnail: "/alica-bakery-principal.png",
    description: "Espacio comercial en Piantini que combina diseño moderno con elementos tradicionales de panadería.",
    uniqueText: "Alica Bakery ofrece una experiencia sensorial donde el diseño interior realza la presentación...",
    details: [
      { label: "Ubicación", value: "Piantini, Santo Domingo, República Dominicana" }, // Ubicación SD mantenida
      { label: "Área", value: "150 m²" }, { label: "Año de finalización", value: "2024" }
    ],
    team: [
      { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Diseñadora Interiores Jr.", value: "Rosa Capellán" }, { label: "Diseñador Industrial / Mobiliario", value: "Kevin Taveras" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Supervisor de Obra (Remodelación)", value: "Chris Lantigua" }, { label: "Técnico Acabados", value: "Saul Peña" }
    ],
    gallery: [
       { image: "/alica-bakery-1.png", title: "Mostrador Principal Elegante", description: "El mostrador central se diseña como una pieza escultórica..." }, { image: "/alica-bakery-2.png", title: "Área de Clientes Confortable", description: "Se crea un espacio de estancia agradable..." }, { image: "/alica-bakery-3.png", title: "Iluminación Cálida y Atmosférica", description: "Una estudiada combinación de luminarias crea..." }, { image: "/alica-bakery-4.png", title: "Detalle de Texturas Naturales", description: "El uso de materiales como madera, terrazo..." }
    ],
    insights: { vision: "Diseñar un espacio comercial que refleje la calidad...", challenge: "Integrar elementos tradicionales de panadería..." }
  },
  page9: { // Nirvana House - Juan Dolio
    projectName: "Nirvana House JD",
    title: "Residencia Sustentable en Juan Dolio",
    image: "/nirvana-house-principal.png",
    thumbnail: "/nirvana-house-principal.png",
    description: "Casa unifamiliar en Metro Country Club que armoniza diseño moderno con principios de sostenibilidad.",
    uniqueText: "Nirvana House es una manifestación de arquitectura consciente, donde cada elemento está pensado...",
    details: [
      { label: "Ubicación", value: "Metro Country Club, Juan Dolio, República Dominicana" }, { label: "Área", value: "400 m²" }, { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Asistente de Diseño", value: "Isaac Jiménez" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Visualizadora 3D", value: "Esmeilyn Peralta" }
    ],
    gallery: [
      { image: "/nirvana-house-1.png", title: "Fachada Principal Moderna", description: "El diseño exterior se caracteriza por líneas puras..." }, { image: "/nirvana-house-2.png", title: "Espacios Interiores Fluidos", description: "Los ambientes interiores son amplios y luminosos..." }, { image: "/nirvana-house-3.png", title: "Patio Central Verde", description: "Un patio central ajardinado actúa como pulmón..." }, { image: "/nirvana-house-4.png", title: "Diseño Pasivo Eficiente", description: "Se aprecian elementos como aleros, protecciones solares..." }, { image: "/nirvana-house-5.png", title: "Integración de Energías Limpias", description: "Vista de la integración de sistemas como paneles solares..." }, { image: "/nirvana-house-6.png", title: "Materiales Ecológicos y Saludables", description: "Detalle del uso de materiales de construcción..." }
    ],
    insights: { vision: "Crear un hogar que sirva como refugio...", challenge: "Implementar soluciones sostenibles avanzadas..." }
  },
  page10: { // Edificio Residencial - Bella Vista, Santiago (Ubicación cambiada)
    projectName: "Edificio Residencial Bella Vista",
    title: "Residencial Urbano Contemporáneo",
    image: "/de-amicis-154-principal.png",
    thumbnail: "/de-amicis-154-principal.png",
    description: "Edificio residencial contemporáneo en Bella Vista, Santiago, caracterizado por una fachada tridimensional.",
    uniqueText: "Ubicado en el sector de Bella Vista, este edificio combina innovación arquitectónica...",
    details: [
      { label: "Ubicación", value: "Bella Vista, Santiago, República Dominicana" }, // Ubicación cambiada a Santiago
      { label: "Área", value: "1,330 m²" }, { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Gerente de Proyecto / Coord. General", value: "Amanda Hernández" }, { label: "Director de Operaciones", value: "Angel Suárez" }, { label: "Soporte Técnico (Instalaciones)", value: "Pedro Abreu" }, { label: "Asesora Legal / Permisos", value: "Sofía de la Cruz" }
    ],
    gallery: [
      { image: "/de-amicis-154-1.png", title: "Fachada Modular y Vibrante", description: "La piel del edificio, formada por paneles prefabricados..." }, { image: "/de-amicis-154-2.png", title: "Inserción Urbana Respetuosa", description: "El edificio se integra en el tejido urbano..." }, { image: "/de-amicis-154-3.png", title: "Detalle Prefabricado Elegante", description: "Primer plano que revela la precisión del diseño..." }, { image: "/de-amicis-154-4.png", title: "Balcones Integrados Discretamente", description: "Los balcones se incorporan de forma sutil..." }, { image: "/de-amicis-154-5.png", title: "Contraste Material: Concreto y Vidrio", description: "El juego visual entre la solidez texturizada..." }
    ],
    insights: { vision: "Crear una arquitectura residencial que dialogue...", challenge: "Diseñar una envolvente arquitectónica prefabricada..." }
  },
  page11: { // Akashi Residence - Punta Cana
    projectName: "Akashi Residence PC",
    title: "Residencia de Lujo en Punta Cana",
    image: "/akashi-residence-principal.png",
    thumbnail: "/akashi-residence-principal.png",
    description: "Residencia unifamiliar en Punta Cana que celebra el movimiento, la luz y la conexión con la naturaleza tropical.",
    uniqueText: "Ubicada en el exclusivo Punta Cana Resort & Club, la Akashi Residence es una casa de seis habitaciones...",
    details: [
      { label: "Ubicación", value: "Punta Cana Resort & Club, Punta Cana, República Dominicana" }, { label: "Área", value: "1,385 m²" }, { label: "Año de finalización", value: "2024" }
    ],
    team: [
      { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Visualizadora 3D", value: "Esmeilyn Peralta" }
    ],
    gallery: [
      { image: "/akashi-residence-1.png", title: "Fachada Principal Orgánica", description: "Vista exterior que muestra la compleja volumetría..." }, { image: "/akashi-residence-2.png", title: "Vacío Central Articulador", description: "El impresionante vacío central funciona como el corazón..." }, { image: "/akashi-residence-3.png", title: "Tobogán Escultórico Lúdico", description: "Un inesperado tobogán de diseño escultórico..." }, { image: "/akashi-residence-4.png", title: "Piscina Tranquila y Reflexiva", description: "La amplia y serena piscina exterior ofrece..." }, { image: "/akashi-residence-5.png", title: "Interiores Abiertos al Paisaje", description: "Los espacios interiores se caracterizan por su apertura..." }, { image: "/akashi-residence-6.png", title: "Puentes y Pasarelas Interiores", description: "Elementos como puentes y pasarelas cruzan..." }
    ],
    insights: { vision: "Diseñar una vivienda que combine principios arquitectónicos...", challenge: "Integrar elementos lúdicos y dinámicos..." }
  }
};

// --- Creación del nuevo objeto `pageData` con slugs ---
// Usamos `reduce` para construir el nuevo objeto asegurando slugs únicos
export const pageData = Object.values(originalProjectsData).reduce((acc, project) => {
  // Quitamos el 'id' numérico si existía, ya no lo necesitamos aquí
  // const { id: oldId, ...projectDetails } = project; // Descomentar si los originales tenían 'id'
  const projectDetails = { ...project }; // Copiamos los detalles del proyecto

  const slug = createSlug(projectDetails.projectName);

  // Verificación simple de unicidad (puedes hacerla más robusta si es necesario)
  if (acc[slug]) {
    console.warn(`Slug duplicado generado para "${projectDetails.projectName}". Se intentará añadir un sufijo.`);
    let counter = 2;
    let newSlug = `${slug}-${counter}`;
    while (acc[newSlug]) {
      counter++;
      newSlug = `${slug}-${counter}`;
    }
    console.warn(`   Nuevo slug generado: "${newSlug}"`);
    acc[newSlug] = {
      ...projectDetails,
      id: newSlug // ** IMPORTANTE: Asignar el nuevo slug como id interno **
    };
  } else {
    acc[slug] = {
      ...projectDetails,
      id: slug // ** IMPORTANTE: Asignar el slug como id interno **
    };
  }
  return acc;
}, {});

// --- FIN: Lógica para Slugs ---


// Exporta también una lista (`projectList`) que ahora contendrá
// los objetos de proyecto con el `id` actualizado al slug.
// Los componentes que importan `projectList` usarán automáticamente estos nuevos IDs.
export const projectList = Object.values(pageData);

// Log para verificar (opcional, puedes quitarlo en producción)
// console.log("Page Data con Slugs:", pageData);
// console.log("Project List con Slugs en IDs:", projectList.map(p => p.id));