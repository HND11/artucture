// src/data/ProjectData.js
// VERSIÓN COMPLETA Y FINAL:
// - Ubicaciones ajustadas (más Santiago, 2 Santo Domingo).
// - Slugs implementados para claves de pageData e IDs internos.
// - Textos descriptivos completos restaurados.

// --- INICIO: Funciones y Lógica para Slugs ---

function createSlug(text) {
  if (!text) return `project-${Math.random().toString(36).substring(7)}`;
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Datos base completos de los proyectos (con textos largos y ubicaciones ajustadas)
const baseProjectsData = {
  // Usamos identificadores temporales aquí antes de convertirlos a slugs como claves
  temp_p1: { // Sinfonía Verde - Jarabacoa
    projectName: "Sinfonía Verde",
    title: "Inmersión en la Naturaleza Dominicana",
    image: "/sinfonia-verde-principal.png",
    thumbnail: "/sinfonia-verde-principal.png",
    description: "Una residencia autosuficiente que se integra armónicamente en la biodiversidad de las montañas de Jarabacoa, República Dominicana.",
    uniqueText: "En las alturas de Jarabacoa, un claro natural permitió construir un hogar sin conexión a la red eléctrica, rodeado por el vibrante bosque nuboso. Inspirada en la complejidad del entorno, la casa adopta una forma circular con un óculo central, ofreciendo una experiencia panorámica que conecta con la naturaleza circundante.",
    details: [ { label: "Ubicación", value: "Jarabacoa, La Vega, República Dominicana" }, { label: "Área", value: "400 m²" }, { label: "Año de finalización", value: "2022" } ],
    team: [ { label: "Arquitecto Principal / Co-Fundador", value: "Hendrick Gómez" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Soporte Técnico (Instalaciones)", value: "Pedro Abreu" } ],
    gallery: [
       { image: "/sinfonia-verde-1.png", title: "Vista Exterior Elevada", description: "La estructura principal se eleva sobre pilotes delgados para minimizar el impacto en el suelo selvático, permitiendo que la flora y fauna prosperen debajo y se integre visualmente con el dosel arbóreo." },
       { image: "/sinfonia-verde-2.png", title: "Óculo Central: Conexión Celestial", description: "El diseño circular incluye un óculo central abierto que funciona como un patio interior, inundando los espacios de luz natural, facilitando la ventilación y ofreciendo una conexión directa con el cielo." },
       { image: "/sinfonia-verde-3.png", title: "Interiores Abiertos a la Naturaleza", description: "Los espacios interiores fluyen sin divisiones rígidas, utilizando grandes aberturas y materiales naturales para borrar los límites entre el interior confortable y la exuberante selva exterior." },
       { image: "/sinfonia-verde-4.png", title: "Techo Hiperbólico Funcional", description: "El distintivo techo con forma de paraboloide hiperbólico no solo define la estética, sino que también canaliza eficientemente el agua de lluvia hacia sistemas de recolección sostenibles." },
       { image: "/sinfonia-verde-5.png", title: "Pasarelas Elevadas y Ligeras", description: "Las diferentes áreas de la casa y el acceso se conectan mediante pasarelas elevadas que flotan sobre el terreno, preservando el ecosistema del suelo y ofreciendo perspectivas únicas del entorno." },
       { image: "/sinfonia-verde-6.png", title: "Detalle Materiales Sostenibles", description: "Primer plano de las juntas y acabados donde se aprecia el uso de maderas locales certificadas y técnicas constructivas de bajo impacto, reflejando el ethos ecológico del proyecto." }
    ],
    insights: {
      vision: "Diseñar una vivienda que se sumerja en los sonidos, la iluminación y la biodiversidad del bosque dominicano, ofreciendo una experiencia inmersiva y respetuosa con el entorno.",
      challenge: "Construir en una ubicación remota y de montaña, sin acceso fácil a servicios, requirió una planificación meticulosa y soluciones sostenibles para minimizar el impacto ambiental."
    }
  },
  temp_p2: { // Gardenia Apartments - Las Terrenas
    projectName: "Gardenia Apartments",
    title: "Residencias Tropicales en Las Terrenas",
    image: "/gardenia-principal.png", // Corregido nombre imagen
    thumbnail: "/gardenia-principal.png",
    description: "Complejo residencial que fusiona diseño contemporáneo con la exuberancia natural de Las Terrenas, Samaná.",
    uniqueText: "Ubicado en la costa atlántica de República Dominicana, Gardenia Apartments ofrece una experiencia de vida que armoniza con la naturaleza tropical. Las unidades residenciales están diseñadas para maximizar la ventilación cruzada y la iluminación natural, utilizando materiales locales y técnicas sostenibles.",
    details: [ { label: "Ubicación", value: "Las Terrenas, Samaná, República Dominicana" }, { label: "Área", value: "1,200 m²" }, { label: "Año de finalización", value: "2022" } ],
    team: [ { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Asistente de Diseño", value: "Isaac Jiménez" }, { label: "Delineante / Asistente Técnico", value: "Ramón García" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" } ],
    gallery: [
       { image: "/gardenia-1.png", title: "Fachada Principal Integrada", description: "La arquitectura del edificio dialoga con el entorno natural mediante el uso de materiales cálidos y volúmenes que respetan la escala del paisaje circundante." },
       { image: "/gardenia-2.png", title: "Espacios Interiores Ventilados", description: "El diseño interior se enfoca en maximizar la entrada de luz natural y promover la ventilación cruzada, creando ambientes frescos y luminosos que reducen la necesidad de climatización artificial." },
       { image: "/gardenia-3.png", title: "Áreas Comunes Exuberantes", description: "Las zonas comunes, incluyendo piscinas y jardines tropicales, están diseñadas para fomentar la interacción social y el disfrute del clima y la vegetación local." },
       { image: "/gardenia-4.png", title: "Terrazas como Extensión Vital", description: "Cada unidad cuenta con amplias terrazas privadas que funcionan como una extensión del área habitable, ofreciendo espacios al aire libre para relajarse y disfrutar de las vistas." },
       { image: "/gardenia-5.png", title: "Detalle de Materiales Locales", description: "Se aprecia el uso de maderas de origen local y otros materiales sostenibles que no solo embellecen los espacios sino que también refuerzan el compromiso ecológico del proyecto." }
    ],
    insights: {
      vision: "Crear un espacio residencial que respete y se integre con la biodiversidad local, ofreciendo confort y sostenibilidad.",
      challenge: "Diseñar en un entorno tropical costero requería soluciones pasivas para el control climático y el uso eficiente de recursos, considerando la brisa marina."
    }
  },
  temp_p3: { // Villa Aurea - Cap Cana
    projectName: "Villa Aurea",
    title: "Refugio Dorado en Cap Cana",
    image: "/villa-aurea-principal.png",
    thumbnail: "/villa-aurea-principal.png",
    description: "Residencia privada que combina lujo y sostenibilidad en el exclusivo entorno de Cap Cana.",
    uniqueText: "Villa Aurea se erige como un santuario moderno que abraza el paisaje tropical de Punta Cana. Con un diseño que permite la entrada de luz natural y ventilación cruzada, la villa utiliza materiales locales y técnicas constructivas que minimizan el impacto ambiental.",
    details: [ { label: "Ubicación", value: "Cap Cana, Punta Cana, República Dominicana" }, { label: "Área", value: "800 m²" }, { label: "Año de finalización", value: "2023" } ],
    team: [ { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Visualizadora 3D", value: "Esmeilyn Peralta" } ],
    gallery: [
        { image: "/villa-aurea-1.png", title: "Vista Exterior Armoniosa", description: "La fachada combina elegantemente materiales como madera, piedra y concreto visto, buscando una integración respetuosa y estética con la paleta de colores y texturas del entorno caribeño." },
        { image: "/villa-aurea-2.png", title: "Piscina Infinita con Vistas", description: "La espectacular piscina de borde infinito se proyecta hacia la densa vegetación tropical, creando una sensación de unidad con el paisaje y ofreciendo un lugar idílico para la contemplación." },
        { image: "/villa-aurea-3.png", title: "Interiores Abiertos y Luminosos", description: "Los espacios interiores se caracterizan por su amplitud y conexión visual directa con el exterior, gracias a grandes ventanales que inundan de luz natural las estancias." },
        { image: "/villa-aurea-4.png", title: "Terrazas Cubiertas Integradas", description: "Generosas terrazas cubiertas extienden las áreas de estar hacia el exterior, proporcionando espacios protegidos del sol y la lluvia para disfrutar del entorno tropical." },
        { image: "/villa-aurea-5.png", title: "Detalle Diseño Bioclimático", description: "Se observan elementos como aleros pronunciados y celosías de madera que controlan la incidencia solar y favorecen la ventilación natural, clave para el confort en el clima caribeño." }
    ],
    insights: {
      vision: "Diseñar una residencia que ofrezca lujo sin comprometer la sostenibilidad y el respeto por la naturaleza.",
      challenge: "Integrar tecnologías modernas en un entorno exclusivo, garantizando eficiencia energética y confort en un clima cálido y húmedo."
    }
  },
   temp_p4: { // Pergola House - Sosúa
    projectName: "Pergola House",
    title: "Casa entre Sombras y Luz Caribeña",
    image: "/pergola-house-principal.png",
    thumbnail: "/pergola-house-principal.png",
    description: "Residencia en Sosúa que utiliza pérgolas para jugar con la luz tropical y crear espacios dinámicos.",
    uniqueText: "Pergola House explora la interacción entre estructuras arquitectónicas y la intensa luz natural del Caribe. Las pérgolas no solo proporcionan sombra vital, sino que también crean patrones de luz que cambian a lo largo del día, ofreciendo una experiencia sensorial única.",
    details: [ { label: "Ubicación", value: "Sosúa, Puerto Plata, República Dominicana" }, { label: "Área", value: "350 m²" }, { label: "Año de finalización", value: "2021" } ],
    team: [ { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Asistente de Diseño", value: "Isaac Jiménez" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" } ],
    gallery: [
       { image: "/pergola-house-1.png", title: "Fachada Dinámica con Pérgolas", description: "El diseño de la fachada se define por la extensa estructura de pérgolas, que genera un constante y cambiante juego de luces y sombras sobre los volúmenes de la casa." },
       { image: "/pergola-house-2.png", title: "Espacios Interiores Iluminados", description: "La luz natural penetra en los interiores de forma controlada a través de las pérgolas, creando ambientes luminosos pero confortables, protegidos del sol tropical directo." },
       { image: "/pergola-house-3.png", title: "Conexión Interior-Exterior Fluida", description: "Las áreas sociales se abren completamente hacia terrazas y jardines sombreados por las pérgolas, promoviendo un estilo de vida que integra el interior con el exterior." },
       { image: "/pergola-house-4.png", title: "Detalle Constructivo de Pérgola", description: "Vista cercana de la estructura de las pérgolas, mostrando el diseño y los materiales empleados para lograr un equilibrio entre funcionalidad (sombra) y estética arquitectónica." }
    ],
    insights: {
      vision: "Crear una vivienda que utilice elementos arquitectónicos para enriquecer la experiencia diaria mediante la luz.",
      challenge: "Diseñar pérgolas que sean estéticamente agradables y altamente funcionales para controlar el sol intenso en un clima tropical caribeño."
    }
  },
  temp_p5: { // Hug House - Santiago
    projectName: "Hug House",
    title: "Casa del Abrazo en Santiago",
    image: "/hug-house-principal.png",
    thumbnail: "/hug-house-principal.png",
    description: "Residencia en Santiago que envuelve a sus habitantes en un diseño cálido y acogedor.",
    uniqueText: "Hug House se concibe como un espacio que abraza a sus ocupantes, utilizando curvas suaves y materiales cálidos. El diseño busca fomentar la intimidad y la conexión familiar, integrándose armoniosamente con su entorno residencial en los Cerros de Gurabo.",
    details: [ { label: "Ubicación", value: "Cerros de Gurabo, Santiago, República Dominicana" }, { label: "Área", value: "250 m²" }, { label: "Año de finalización", value: "2022" } ],
    team: [ { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Arquitecto Senior", value: "Jeremy Antigua" }, { label: "Diseño Interior", value: "Cristal Corniel" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" } ],
    gallery: [
       { image: "/hug-house-1.png", title: "Fachada Curva y Protectora", description: "El diseño exterior se caracteriza por sus suaves líneas curvas que envuelven el espacio interior, generando una sensación de protección y calidez desde la primera impresión." },
       { image: "/hug-house-2.png", title: "Interiores Acogedores y Táctiles", description: "El uso predominante de maderas claras y texturas suaves en los acabados interiores crea una atmósfera íntima, confortable y agradable al tacto." },
       { image: "/hug-house-3.png", title: "Espacios Familiares Fluidos", description: "Las áreas comunes están diseñadas para la convivencia familiar, con una distribución fluida definida por las formas curvas que invitan a la interacción." },
       { image: "/hug-house-4.png", title: "Juego de Luces en Superficies Curvas", description: "La incidencia de la luz natural sobre las paredes y techos curvos genera suaves gradientes y reflejos que acentúan la sensación de calma y fluidez espacial." },
       { image: "/hug-house-5.png", title: "Conexión Gradual con el Jardín", description: "Aberturas y patios interiores conectan sutilmente los espacios interiores con el jardín, introduciendo elementos naturales de forma controlada y serena." },
       { image: "/hug-house-6.png", title: "Detalle de Carpintería Orgánica", description: "El mobiliario integrado y los detalles de carpintería adoptan las formas curvas de la arquitectura, asegurando una total coherencia estética y funcional en el diseño." }
    ],
    insights: {
      vision: "Diseñar una casa que proporcione un refugio emocional y físico para sus habitantes.",
      challenge: "Integrar formas curvas en la construcción residencial sin comprometer la funcionalidad y eficiencia espacial."
    }
  },
  temp_p6: { // Apartamento Colonial - Zona Colonial, SD (Mantenido en SD)
    projectName: "Apartamento Colonial Renovado",
    title: "Apartamento Histórico en la Zona Colonial",
    image: "/plazuela-santiago-principal.png",
    thumbnail: "/plazuela-santiago-principal.png",
    description: "Renovación de un apartamento en un edificio histórico de la Zona Colonial, combinando elementos tradicionales y contemporáneos.",
    uniqueText: "Este proyecto transforma un apartamento en la histórica Zona Colonial de Santo Domingo, respetando su valor patrimonial mientras introduce elementos modernos que mejoran la funcionalidad y estética del espacio.",
    details: [ { label: "Ubicación", value: "Zona Colonial, Santo Domingo, República Dominicana" }, { label: "Área", value: "90 m²" }, { label: "Año de finalización", value: "2023" } ],
    team: [ { label: "Arquitecto Principal", value: "Hendrick Gómez" }, { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Diseñadora Interiores Jr.", value: "Rosa Capellán" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Técnico Acabados / Instalador", value: "Saul Peña" } ],
    gallery: [
       { image: "/plazuela-santiago-1.png", title: "Salón Renovado con Carácter", description: "El salón principal muestra una equilibrada combinación de elementos históricos restaurados, como molduras y carpinterías, con mobiliario y soluciones de diseño contemporáneo." },
       { image: "/plazuela-santiago-2.png", title: "Cocina Abierta y Moderna", description: "La cocina se integra al área social con un diseño abierto y funcional, utilizando materiales actuales y electrodomésticos eficientes que contrastan respetuosamente con la estructura antigua." },
       { image: "/plazuela-santiago-3.png", title: "Dormitorio Principal Acogedor", description: "Se genera un ambiente cálido y sereno en el dormitorio principal, donde detalles originales recuperados, como vigas o muros de piedra, conviven con un interiorismo moderno y confortable." },
       { image: "/plazuela-santiago-4.png", title: "Encuentro Respetuoso de Épocas", description: "Detalle constructivo que evidencia el cuidadoso diálogo entre los elementos históricos preservados y las nuevas intervenciones, mostrando la superposición de capas temporales." },
       { image: "/plazuela-santiago-5.png", title: "Suelos Originales Restaurados", description: "Vista de los suelos de madera o baldosa hidráulica originales, que han sido cuidadosamente restaurados para conservar su valor histórico y aportar carácter único al apartamento." }
    ],
    insights: {
      vision: "Fusionar la rica historia del edificio colonial con las necesidades modernas de habitabilidad.",
      challenge: "Mantener la integridad estructural y estética del edificio patrimonial mientras se actualizan sus instalaciones y se cumplen normativas de conservación."
    }
  },
  temp_p7: { // Centro Educativo - Mirador Sur, Santiago (Movido a Santiago)
    projectName: "Centro Educativo Mirador",
    title: "Centro de Ciencias y Medio Ambiente",
    image: "/nueva-school-principal.png",
    thumbnail: "/nueva-school-principal.png",
    description: "Edificio educativo en Santiago que promueve el aprendizaje sostenible y la conexión con la naturaleza.", // Descripción actualizada
    uniqueText: "El Centro de Ciencias y Medio Ambiente de este colegio está diseñado para inspirar a los estudiantes a través de espacios que fomentan la curiosidad científica y el respeto por el medio ambiente, integrándose al entorno urbano de Santiago.", // Texto actualizado
    details: [ { label: "Ubicación", value: "Mirador Sur, Santiago, República Dominicana" }, { label: "Área", value: "2,000 m²" }, { label: "Año de finalización", value: "2022" } ],
    team: [ { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Gerente de Proyecto / Coord. General", value: "Amanda Hernández" }, { label: "Director de Operaciones", value: "Angel Suárez" }, { label: "Asesora Legal / Permisos", value: "Sofía de la Cruz" } ],
    gallery: [
       { image: "/nueva-school-1.png", title: "Fachada Integrada al Entorno", description: "El diseño exterior utiliza materiales naturales y formas orgánicas para integrarse suavemente en el paisaje del campus, minimizando su impacto visual y conectando con la naturaleza." },
       { image: "/nueva-school-2.png", title: "Laboratorios Flexibles y Modernos", description: "Los espacios de laboratorio son luminosos, tecnológicamente equipados y altamente flexibles para adaptarse a diversas actividades de aprendizaje práctico, experimentación e investigación." },
       { image: "/nueva-school-3.png", title: "Áreas Comunes para Colaborar", description: "Zonas de encuentro informales y espacios de estudio están diseñados para fomentar la colaboración, el intercambio de ideas y el aprendizaje entre pares y con los docentes." },
       { image: "/nueva-school-4.png", title: "Aulas Abiertas al Aprendizaje Exterior", description: "Las aulas cuentan con grandes ventanales y acceso directo a zonas exteriores, facilitando el aprendizaje experiencial y la observación directa del medio ambiente." },
       { image: "/nueva-school-5.png", title: "Sostenibilidad como Herramienta Educativa", description: "El edificio incorpora estrategias de diseño sostenible visibles, como techos verdes o sistemas de gestión de agua, que funcionan también como elementos pedagógicos para los estudiantes." }
    ],
    insights: {
      vision: "Crear un entorno educativo que refleje los valores de sostenibilidad y aprendizaje activo.",
      challenge: "Diseñar un edificio educativo que cumpla con altos estándares ecológicos sin comprometer la funcionalidad y seguridad en un contexto urbano."
    }
  },
  temp_p8: { // Alica Bakery - Piantini, SD (Mantenido en SD)
    projectName: "Alica Bakery SD",
    title: "Panadería Contemporánea en Piantini",
    image: "/alica-bakery-principal.png",
    thumbnail: "/alica-bakery-principal.png",
    description: "Espacio comercial en Piantini que combina diseño moderno con elementos tradicionales de panadería.",
    uniqueText: "Alica Bakery ofrece una experiencia sensorial donde el diseño interior realza la presentación de productos artesanales, creando un ambiente acogedor y sofisticado en el corazón de Santo Domingo.",
    details: [ { label: "Ubicación", value: "Piantini, Santo Domingo, República Dominicana" }, { label: "Área", value: "150 m²" }, { label: "Año de finalización", value: "2024" } ],
    team: [ { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Diseñadora Interiores Jr.", value: "Rosa Capellán" }, { label: "Diseñador Industrial / Mobiliario", value: "Kevin Taveras" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Supervisor de Obra (Remodelación)", value: "Chris Lantigua" }, { label: "Técnico Acabados", value: "Saul Peña" } ],
    gallery: [
       { image: "/alica-bakery-1.png", title: "Mostrador Principal Elegante", description: "El mostrador central se diseña como una pieza escultórica, utilizando materiales nobles y una iluminación cuidada para destacar la calidad y presentación de los productos horneados." },
       { image: "/alica-bakery-2.png", title: "Área de Clientes Confortable", description: "Se crea un espacio de estancia agradable y estéticamente cuidado para que los clientes disfruten de los productos in situ o esperen cómodamente sus pedidos." },
       { image: "/alica-bakery-3.png", title: "Iluminación Cálida y Atmosférica", description: "Una estudiada combinación de luminarias crea una atmósfera cálida y acogedora, poniendo en valor tanto la arquitectura del local como los productos expuestos." },
       { image: "/alica-bakery-4.png", title: "Detalle de Texturas Naturales", description: "El uso de materiales como madera, terrazo y revocos con textura aporta calidez y un contrapunto artesanal al diseño general contemporáneo y minimalista." }
    ],
    insights: {
      vision: "Diseñar un espacio comercial que refleje la calidad artesanal de los productos ofrecidos.",
      challenge: "Integrar elementos tradicionales de panadería en un diseño contemporáneo atractivo para una clientela urbana sofisticada."
    }
  },
  temp_p9: { // Nirvana House - Juan Dolio
    projectName: "Nirvana House JD",
    title: "Residencia Sustentable en Juan Dolio",
    image: "/nirvana-house-principal.png",
    thumbnail: "/nirvana-house-principal.png",
    description: "Casa unifamiliar en Metro Country Club que armoniza diseño moderno con principios de sostenibilidad.",
    uniqueText: "Nirvana House es una manifestación de arquitectura consciente, donde cada elemento está pensado para minimizar el impacto ambiental y maximizar el confort de sus habitantes en el entorno de Juan Dolio.",
    details: [ { label: "Ubicación", value: "Metro Country Club, Juan Dolio, República Dominicana" }, { label: "Área", value: "400 m²" }, { label: "Año de finalización", value: "2023" } ],
    team: [ { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Asistente de Diseño", value: "Isaac Jiménez" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Visualizadora 3D", value: "Esmeilyn Peralta" } ],
    gallery: [
       { image: "/nirvana-house-1.png", title: "Fachada Principal Moderna", description: "El diseño exterior se caracteriza por líneas puras y volúmenes claros, utilizando materiales sostenibles y de bajo mantenimiento que se integran con el paisaje circundante." },
       { image: "/nirvana-house-2.png", title: "Espacios Interiores Fluidos", description: "Los ambientes interiores son amplios y luminosos, diseñados con flexibilidad y conectados visualmente para maximizar la sensación de espacio y la entrada de luz natural." },
       { image: "/nirvana-house-3.png", title: "Patio Central Verde", description: "Un patio central ajardinado actúa como pulmón de la casa, articulando los espacios, mejorando la ventilación e introduciendo un elemento natural en el corazón del hogar." },
       { image: "/nirvana-house-4.png", title: "Diseño Pasivo Eficiente", description: "Se aprecian elementos como aleros, protecciones solares y una estudiada orientación que forman parte de las estrategias de diseño pasivo para optimizar el confort térmico de forma natural." },
       { image: "/nirvana-house-5.png", title: "Integración de Energías Limpias", description: "Vista de la integración de sistemas como paneles solares fotovoltaicos o colectores solares térmicos, que reducen la huella de carbono y la dependencia energética de la vivienda." },
       { image: "/nirvana-house-6.png", title: "Materiales Ecológicos y Saludables", description: "Detalle del uso de materiales de construcción de bajo impacto ambiental, reciclados o naturales (maderas certificadas, aislantes, pinturas), que contribuyen a un ambiente interior saludable." }
    ],
    insights: {
      vision: "Crear un hogar que sirva como refugio y esté en sintonía con la naturaleza.",
      challenge: "Implementar soluciones sostenibles avanzadas sin comprometer el diseño estético y funcional en un contexto residencial de golf."
    }
  },
  temp_p10: { // Edificio Residencial - Bella Vista, Santiago (Movido a Santiago)
    projectName: "Edificio Residencial Bella Vista",
    title: "Residencial Urbano Contemporáneo",
    image: "/de-amicis-154-principal.png",
    thumbnail: "/de-amicis-154-principal.png",
    description: "Edificio residencial contemporáneo en Bella Vista, Santiago, caracterizado por una fachada tridimensional.", // Descripción actualizada
    uniqueText: "Ubicado en el sector de Bella Vista, este edificio combina innovación arquitectónica con sensibilidad urbana. La fachada, compuesta por elementos modulares, responde a las condiciones de luz y sombra del entorno caribeño y ofrece una nueva lectura del ritmo de las fachadas urbanas.", // Texto actualizado
    details: [ { label: "Ubicación", value: "Bella Vista, Santiago, República Dominicana" }, { label: "Área", value: "1,330 m²" }, { label: "Año de finalización", value: "2023" } ],
    team: [ { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Líder Diseño Arquitectónico", value: "Jeremy Antigua" }, { label: "Gerente de Proyecto / Coord. General", value: "Amanda Hernández" }, { label: "Director de Operaciones", value: "Angel Suárez" }, { label: "Soporte Técnico (Instalaciones)", value: "Pedro Abreu" }, { label: "Asesora Legal / Permisos", value: "Sofía de la Cruz" } ],
    gallery: [
       { image: "/de-amicis-154-1.png", title: "Fachada Modular y Vibrante", description: "La piel del edificio, formada por paneles prefabricados con distintas profundidades, crea un dinámico juego de luces, sombras y texturas que cambia a lo largo del día." },
       { image: "/de-amicis-154-2.png", title: "Inserción Urbana Respetuosa", description: "El edificio se integra en el tejido urbano de Santiago de forma contemporánea pero respetuosa, dialogando con las alturas y ritmos de las edificaciones colindantes." }, // Ajuste texto a Santiago
       { image: "/de-amicis-154-3.png", title: "Detalle Prefabricado Elegante", description: "Primer plano que revela la precisión del diseño y la ejecución de los módulos, combinando innovación técnica en prefabricación con una notable elegancia formal." },
       { image: "/de-amicis-154-4.png", title: "Balcones Integrados Discretamente", description: "Los balcones se incorporan de forma sutil en la modulación de la fachada, ofreciendo espacios exteriores privados sin interrumpir la lectura continua de la envolvente." },
       { image: "/de-amicis-154-5.png", title: "Contraste Material: Concreto y Vidrio", description: "El juego visual entre la solidez texturizada del concreto prefabricado y la transparencia reflectante del vidrio define el carácter contemporáneo y sofisticado de la fachada." }
    ],
    insights: {
      vision: "Crear una arquitectura residencial que dialogue con el contexto urbano mediante soluciones contemporáneas e inteligentes.",
      challenge: "Diseñar una envolvente arquitectónica prefabricada que combine eficiencia constructiva con valor estético y contextual en el mercado dominicano."
    }
  },
  temp_p11: { // Akashi Residence - Punta Cana
    projectName: "Akashi Residence PC",
    title: "Residencia de Lujo en Punta Cana",
    image: "/akashi-residence-principal.png",
    thumbnail: "/akashi-residence-principal.png",
    description: "Residencia unifamiliar en Punta Cana que celebra el movimiento, la luz y la conexión con la naturaleza tropical.",
    uniqueText: "Ubicada en el exclusivo Punta Cana Resort & Club, la Akashi Residence es una casa de seis habitaciones diseñada con principios arquitectónicos modernos y un espíritu de creatividad. La vivienda se define por su audaz vacío central, un elemento arquitectónico que aporta luz natural, aire y una sensación de apertura al corazón del hogar.",
    details: [ { label: "Ubicación", value: "Punta Cana Resort & Club, Punta Cana, República Dominicana" }, { label: "Área", value: "1,385 m²" }, { label: "Año de finalización", value: "2024" } ],
    team: [ { label: "Arquitecto Principal / CEO", value: "Hendrick Gómez" }, { label: "Directora de Diseño Interior", value: "Cristal Corniel" }, { label: "Gerente de Proyecto", value: "Amanda Hernández" }, { label: "Líder de Construcción", value: "Angel Suárez" }, { label: "Supervisor de Obra", value: "Chris Lantigua" }, { label: "Visualizadora 3D", value: "Esmeilyn Peralta" } ],
    gallery: [
       { image: "/akashi-residence-1.png", title: "Fachada Principal Orgánica", description: "Vista exterior que muestra la compleja volumetría de la residencia y su integración fluida con el paisaje tropical circundante, utilizando formas curvas y materiales naturales." },
       { image: "/akashi-residence-2.png", title: "Vacío Central Articulador", description: "El impresionante vacío central funciona como el corazón de la casa, trayendo luz y ventilación al interior y conectando visual y espacialmente los diferentes niveles y alas." },
       { image: "/akashi-residence-3.png", title: "Tobogán Escultórico Lúdico", description: "Un inesperado tobogán de diseño escultórico conecta elegantemente los niveles superiores e inferiores, añadiendo un elemento de juego y dinamismo a la experiencia espacial." },
       { image: "/akashi-residence-4.png", title: "Piscina Tranquila y Reflexiva", description: "La amplia y serena piscina exterior ofrece un contrapunto de calma a la dinámica interior, creando un espacio perfecto para la relajación y el disfrute del entorno." },
       { image: "/akashi-residence-5.png", title: "Interiores Abiertos al Paisaje", description: "Los espacios interiores se caracterizan por su apertura y fluidez, fomentando la interacción y manteniendo una conexión constante, visual y física, con la exuberante naturaleza caribeña." },
       { image: "/akashi-residence-6.png", title: "Puentes y Pasarelas Interiores", description: "Elementos como puentes y pasarelas cruzan el vacío central en los niveles superiores, añadiendo complejidad espacial y conectando las distintas áreas de la vivienda de forma dinámica." }
    ],
    insights: {
      vision: "Diseñar una vivienda que combine principios arquitectónicos modernos con un espíritu de creatividad y exploración, celebrando el movimiento, la luz y la conexión con la naturaleza caribeña.",
      challenge: "Integrar elementos lúdicos y dinámicos en el diseño residencial de lujo sin comprometer la funcionalidad y la armonía con el entorno natural exclusivo."
    }
  }
};

// --- Creación del nuevo objeto `pageData` exportado con slugs ---
export const pageData = Object.values(baseProjectsData).reduce((acc, project) => {
  const projectDetails = { ...project };
  const slug = createSlug(projectDetails.projectName);

  let uniqueSlug = slug;
  let counter = 2;
  while (acc[uniqueSlug]) {
    // console.warn(`Slug duplicado detectado para "${projectDetails.projectName}" ("${slug}"). Generando alternativa.`); // Opcional: quitar warnings en producción
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  // if (uniqueSlug !== slug) { console.warn(`   Slug final usado: "${uniqueSlug}"`); } // Opcional

  acc[uniqueSlug] = {
    ...projectDetails,
    id: uniqueSlug // Asignar el slug único como el nuevo ID interno
  };

  return acc;
}, {});

// --- FIN: Lógica para Slugs ---


// Exporta la lista de proyectos (`projectList`).
// Los objetos dentro de esta lista AHORA tendrán la propiedad `id` con el slug.
export const projectList = Object.values(pageData);