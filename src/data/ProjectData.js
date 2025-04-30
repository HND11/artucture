// src/data/projectData.js

// Datos de los proyectos. Título, descripción y uniqueText originales. Galería expandida.
// Asegúrate de que las rutas de las imágenes sean correctas y existan en tu carpeta `public`.

export const pageData = {
  page1: {
    id: "page1",
    projectName: "Sinfonía Verde",
    title: "Inmersión en la Selva de Osa", // Original
    image: "/sinfonia-verde-principal.png",
    thumbnail: "/sinfonia-verde-principal.png",
    description: "Una residencia autosuficiente que se integra armónicamente en la biodiversidad de la Península de Osa, Costa Rica.", // Original
    uniqueText: "En las profundidades de la Península de Osa, un claro natural creado por la caída de un árbol permitió a dos investigadores construir un hogar sin conexión a la red eléctrica, rodeado por la vibrante selva tropical. Inspirada en la complejidad de la selva, la casa adopta una forma circular con un óculo central, ofreciendo una experiencia panorámica que conecta con la naturaleza circundante.", // Original
    details: [
      { label: "Ubicación", value: "Carate, Península de Osa, Costa Rica" },
      { label: "Área", value: "400 m²" },
      { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitecto Principal", value: "Frederik Dolmans" },
      { label: "Socio", value: "Benjamin G Saxe" },
      { label: "Constructor", value: "Gabriel Reyes" },
      { label: "Ingeniero Electromecánico", value: "CIEM" },
      { label: "Ingeniero Estructural", value: "GUIDI Estructurales" },
      { label: "Fotografía", value: "Alvaro Fonseca" }
    ],
    gallery: [
      {
        image: "/sinfonia-verde-1.png",
        title: "Vista Exterior Elevada", // Título ajustado para claridad
        description: "La estructura principal se eleva sobre pilotes delgados para minimizar el impacto en el suelo selvático, permitiendo que la flora y fauna prosperen debajo y se integre visualmente con el dosel arbóreo." // Descripción expandida
      },
      {
        image: "/sinfonia-verde-2.png",
        title: "Óculo Central: Conexión Celestial", // Título ajustado para claridad
        description: "El diseño circular incluye un óculo central abierto que funciona como un patio interior, inundando los espacios de luz natural, facilitando la ventilación y ofreciendo una conexión directa con el cielo." // Descripción expandida
      },
      {
        image: "/sinfonia-verde-3.png",
        title: "Interiores Abiertos a la Naturaleza", // Título ajustado para claridad
        description: "Los espacios interiores fluyen sin divisiones rígidas, utilizando grandes aberturas y materiales naturales para borrar los límites entre el interior confortable y la exuberante selva exterior." // Descripción expandida
      },
      {
        image: "/sinfonia-verde-4.png",
        title: "Techo Hiperbólico Funcional", // Título ajustado para claridad
        description: "El distintivo techo con forma de paraboloide hiperbólico no solo define la estética, sino que también canaliza eficientemente el agua de lluvia hacia sistemas de recolección sostenibles." // Descripción expandida
      },
      {
        image: "/sinfonia-verde-5.png",
        title: "Pasarelas Elevadas y Ligeras", // Título ajustado para claridad
        description: "Las diferentes áreas de la casa y el acceso se conectan mediante pasarelas elevadas que flotan sobre el terreno, preservando el ecosistema del suelo y ofreciendo perspectivas únicas del entorno." // Descripción expandida
      },
      {
        image: "/sinfonia-verde-6.png", // Imagen añadida
        title: "Detalle Materiales Sostenibles",
        description: "Primer plano de las juntas y acabados donde se aprecia el uso de maderas locales certificadas y técnicas constructivas de bajo impacto, reflejando el ethos ecológico del proyecto." // Nueva imagen y descripción expandida
      }
    ], // 6 items
    insights: { // Original
      vision: "Diseñar una vivienda que se sumerja en los sonidos, la iluminación y la biodiversidad de la selva, ofreciendo una experiencia inmersiva y respetuosa con el entorno.",
      challenge: "Construir en una ubicación remota y desafiante, sin acceso a electricidad ni agua, requirió una planificación meticulosa y soluciones sostenibles para minimizar el impacto ambiental."
    }
  },
  page2: {
    id: "page2",
    projectName: "Gardenia Apartments",
    title: "Residencias Tropicales en Nosara", // Original
    image: "/gardenia-apartments-principal.png",
    thumbnail: "/gardenia-apartments-principal.png",
    description: "Complejo residencial que fusiona diseño contemporáneo con la exuberancia natural de Nosara, Costa Rica.", // Original
    uniqueText: "Ubicado en la costa pacífica de Costa Rica, Gardenia Apartments ofrece una experiencia de vida que armoniza con la naturaleza. Las unidades residenciales están diseñadas para maximizar la ventilación cruzada y la iluminación natural, utilizando materiales locales y técnicas sostenibles.", // Original
    details: [
      { label: "Ubicación", value: "Nosara, Costa Rica" },
      { label: "Área", value: "1,200 m²" },
      { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitecto Principal", value: "Benjamin G. Saxe" },
      { label: "Equipo de Diseño", value: "Studio Saxe" },
      { label: "Fotografía", value: "Andrés García Lachner" }
    ],
    gallery: [
      {
        image: "/gardenia-1.png",
        title: "Fachada Principal Integrada", // Título ajustado
        description: "La arquitectura del edificio dialoga con el entorno natural mediante el uso de materiales cálidos y volúmenes que respetan la escala del paisaje circundante." // Descripción expandida
      },
      {
        image: "/gardenia-2.png",
        title: "Espacios Interiores Ventilados", // Título ajustado
        description: "El diseño interior se enfoca en maximizar la entrada de luz natural y promover la ventilación cruzada, creando ambientes frescos y luminosos que reducen la necesidad de climatización artificial." // Descripción expandida
      },
      {
        image: "/gardenia-3.png",
        title: "Áreas Comunes Exuberantes", // Título ajustado
        description: "Las zonas comunes, incluyendo piscinas y jardines tropicales, están diseñadas para fomentar la interacción social y el disfrute del clima y la vegetación local." // Descripción expandida
      },
       {
        image: "/gardenia-4.png", // Imagen añadida
        title: "Terrazas como Extensión Vital",
        description: "Cada unidad cuenta con amplias terrazas privadas que funcionan como una extensión del área habitable, ofreciendo espacios al aire libre para relajarse y disfrutar de las vistas." // Nueva imagen y descripción expandida
      },
      {
        image: "/gardenia-5.png", // Imagen añadida
        title: "Detalle de Materiales Locales",
        description: "Se aprecia el uso de maderas de origen local y otros materiales sostenibles que no solo embellecen los espacios sino que también refuerzan el compromiso ecológico del proyecto." // Nueva imagen y descripción expandida
      }
    ], // 5 items
    insights: { // Original
      vision: "Crear un espacio residencial que respete y se integre con la biodiversidad local, ofreciendo confort y sostenibilidad.",
      challenge: "Diseñar en un entorno tropical requería soluciones pasivas para el control climático y el uso eficiente de recursos."
    }
  },
  page3: {
    id: "page3",
    projectName: "Villa Aurea",
    title: "Refugio Dorado en la Selva", // Original
    image: "/villa-aurea-principal.png",
    thumbnail: "/villa-aurea-principal.png",
    description: "Residencia privada que combina lujo y sostenibilidad en medio de la selva costarricense.", // Original
    uniqueText: "Villa Aurea se erige como un santuario moderno que abraza la naturaleza circundante. Con un diseño que permite la entrada de luz natural y ventilación cruzada, la villa utiliza materiales locales y técnicas constructivas que minimizan el impacto ambiental.", // Original
    details: [
      { label: "Ubicación", value: "Santa Teresa, Costa Rica" },
      { label: "Área", value: "800 m²" },
      { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitecto Principal", value: "Benjamin G. Saxe" },
      { label: "Equipo de Diseño", value: "Studio Saxe" },
      { label: "Fotografía", value: "Roberto D'Angelo" }
    ],
    gallery: [
       {
        image: "/villa-aurea-1.png",
        title: "Vista Exterior Armoniosa", // Título ajustado
        description: "La fachada combina elegantemente materiales como madera, piedra y concreto visto, buscando una integración respetuosa y estética con la paleta de colores y texturas de la selva." // Descripción expandida
      },
      {
        image: "/villa-aurea-2.png",
        title: "Piscina Infinita con Vistas", // Título ajustado
        description: "La espectacular piscina de borde infinito se proyecta hacia la densa vegetación, creando una sensación de unidad con el paisaje y ofreciendo un lugar idílico para la contemplación." // Descripción expandida
      },
      {
        image: "/villa-aurea-3.png",
        title: "Interiores Abiertos y Luminosos", // Título ajustado
        description: "Los espacios interiores se caracterizan por su amplitud y conexión visual directa con el exterior, gracias a grandes ventanales que inundan de luz natural las estancias." // Descripción expandida
      },
      {
        image: "/villa-aurea-4.png", // Imagen añadida
        title: "Terrazas Cubiertas Integradas",
        description: "Generosas terrazas cubiertas extienden las áreas de estar hacia el exterior, proporcionando espacios protegidos del sol y la lluvia para disfrutar del entorno selvático." // Nueva imagen y descripción expandida
      },
       {
        image: "/villa-aurea-5.png", // Imagen añadida
        title: "Detalle Diseño Bioclimático",
        description: "Se observan elementos como aleros pronunciados y celosías de madera que controlan la incidencia solar y favorecen la ventilación natural, clave para el confort en clima tropical." // Nueva imagen y descripción expandida
      }
    ], // 5 items
    insights: { // Original
      vision: "Diseñar una residencia que ofrezca lujo sin comprometer la sostenibilidad y el respeto por la naturaleza.",
      challenge: "Integrar tecnologías modernas en un entorno remoto, garantizando eficiencia energética y confort."
    }
  },
  page4: {
    id: "page4",
    projectName: "Pergola House",
    title: "Casa entre Sombras y Luz", // Original
    image: "/pergola-house-principal.png",
    thumbnail: "/pergola-house-principal.png",
    description: "Residencia que utiliza pérgolas para jugar con la luz y crear espacios dinámicos.", // Original
    uniqueText: "Pergola House explora la interacción entre estructuras arquitectónicas y la luz natural. Las pérgolas no solo proporcionan sombra, sino que también crean patrones de luz que cambian a lo largo del día, ofreciendo una experiencia sensorial única.", // Original
    details: [
      { label: "Ubicación", value: "Nosara, Costa Rica" },
      { label: "Área", value: "350 m²" },
      { label: "Año de finalización", value: "2021" }
    ],
    team: [
      { label: "Arquitecto Principal", value: "Benjamin G. Saxe" },
      { label: "Equipo de Diseño", value: "Studio Saxe" },
      { label: "Fotografía", value: "Fernando Alda" }
    ],
    gallery: [
      {
        image: "/pergola-house-1.png",
        title: "Fachada Dinámica con Pérgolas", // Título ajustado
        description: "El diseño de la fachada se define por la extensa estructura de pérgolas, que genera un constante y cambiante juego de luces y sombras sobre los volúmenes de la casa." // Descripción expandida
      },
      {
        image: "/pergola-house-2.png",
        title: "Espacios Interiores Iluminados", // Título ajustado
        description: "La luz natural penetra en los interiores de forma controlada a través de las pérgolas, creando ambientes luminosos pero confortables, protegidos del sol tropical directo." // Descripción expandida
      },
      {
        image: "/pergola-house-3.png",
        title: "Conexión Interior-Exterior Fluida", // Título ajustado
        description: "Las áreas sociales se abren completamente hacia terrazas y jardines sombreados por las pérgolas, promoviendo un estilo de vida que integra el interior con el exterior." // Descripción expandida
      },
      {
        image: "/pergola-house-4.png", // Imagen añadida
        title: "Detalle Constructivo de Pérgola",
        description: "Vista cercana de la estructura de las pérgolas, mostrando el diseño y los materiales empleados para lograr un equilibrio entre funcionalidad (sombra) y estética arquitectónica." // Nueva imagen y descripción expandida
      }
    ], // 4 items
    insights: { // Original
      vision: "Crear una vivienda que utilice elementos arquitectónicos para enriquecer la experiencia diaria mediante la luz.",
      challenge: "Diseñar pérgolas que sean estéticamente agradables y funcionales en un clima tropical."
    }
  },
   page5: {
    id: "page5",
    projectName: "Hug House",
    title: "Casa del Abrazo", // Original
    image: "/hug-house-principal.png",
    thumbnail: "/hug-house-principal.png",
    description: "Residencia que envuelve a sus habitantes en un diseño cálido y acogedor.", // Original
    uniqueText: "Hug House se concibe como un espacio que abraza a sus ocupantes, utilizando curvas suaves y materiales cálidos. El diseño busca fomentar la intimidad y la conexión familiar, integrándose armoniosamente con su entorno suburbano.", // Original
    details: [
      { label: "Ubicación", value: "Melbourne, Australia" },
      { label: "Área", value: "250 m²" },
      { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitectos", value: "FIGR Architecture & Design" },
      { label: "Fotografía", value: "Tom Blachford" }
    ],
    gallery: [
      {
        image: "/hug-house-1.png",
        title: "Fachada Curva y Protectora", // Título ajustado
        description: "El diseño exterior se caracteriza por sus suaves líneas curvas que envuelven el espacio interior, generando una sensación de protección y calidez desde la primera impresión." // Descripción expandida
      },
      {
        image: "/hug-house-2.png",
        title: "Interiores Acogedores y Táctiles", // Título ajustado
        description: "El uso predominante de maderas claras y texturas suaves en los acabados interiores crea una atmósfera íntima, confortable y agradable al tacto." // Descripción expandida
      },
      {
        image: "/hug-house-3.png",
        title: "Espacios Familiares Fluidos", // Título ajustado
        description: "Las áreas comunes están diseñadas para la convivencia familiar, con una distribución fluida definida por las formas curvas que invitan a la interacción." // Descripción expandida
      },
       {
        image: "/hug-house-4.png", // Imagen añadida
        title: "Juego de Luces en Superficies Curvas",
        description: "La incidencia de la luz natural sobre las paredes y techos curvos genera suaves gradientes y reflejos que acentúan la sensación de calma y fluidez espacial." // Nueva imagen y descripción expandida
      },
      {
        image: "/hug-house-5.png", // Imagen añadida
        title: "Conexión Gradual con el Jardín",
        description: "Aberturas y patios interiores conectan sutilmente los espacios interiores con el jardín, introduciendo elementos naturales de forma controlada y serena." // Nueva imagen y descripción expandida
      },
       {
        image: "/hug-house-6.png", // Imagen añadida
        title: "Detalle de Carpintería Orgánica",
        description: "El mobiliario integrado y los detalles de carpintería adoptan las formas curvas de la arquitectura, asegurando una total coherencia estética y funcional en el diseño." // Nueva imagen y descripción expandida
      }
    ], // 6 items
    insights: { // Original
      vision: "Diseñar una casa que proporcione un refugio emocional y físico para sus habitantes.",
      challenge: "Integrar formas curvas en la construcción sin comprometer la funcionalidad y eficiencia."
    }
  },
  page6: {
    id: "page6",
    projectName: "Plazuela de Santiago Apartment",
    title: "Apartamento Histórico Renovado", // Original
    image: "/plazuela-santiago-principal.png",
    thumbnail: "/plazuela-santiago-principal.png",
    description: "Renovación de un apartamento en un edificio histórico, combinando elementos tradicionales y contemporáneos.", // Original
    uniqueText: "Este proyecto transforma un apartamento en la Plazuela de Santiago, respetando su valor patrimonial mientras introduce elementos modernos que mejoran la funcionalidad y estética del espacio.", // Original
    details: [
      { label: "Ubicación", value: "Bilbao, España" },
      { label: "Área", value: "90 m²" },
      { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitectos", value: "BabelStudio" },
      { label: "Fotografía", value: "Luis Díaz Díaz" }
    ],
    gallery: [
      {
        image: "/plazuela-santiago-1.png",
        title: "Salón Renovado con Carácter", // Título ajustado
        description: "El salón principal muestra una equilibrada combinación de elementos históricos restaurados, como molduras y carpinterías, con mobiliario y soluciones de diseño contemporáneo." // Descripción expandida
      },
      {
        image: "/plazuela-santiago-2.png",
        title: "Cocina Abierta y Moderna", // Título ajustado
        description: "La cocina se integra al área social con un diseño abierto y funcional, utilizando materiales actuales y electrodomésticos eficientes que contrastan respetuosamente con la estructura antigua." // Descripción expandida
      },
      {
        image: "/plazuela-santiago-3.png",
        title: "Dormitorio Principal Acogedor", // Título ajustado
        description: "Se genera un ambiente cálido y sereno en el dormitorio principal, donde detalles originales recuperados, como vigas o muros de piedra, conviven con un interiorismo moderno y confortable." // Descripción expandida
      },
      {
        image: "/plazuela-santiago-4.png", // Imagen añadida
        title: "Encuentro Respetuoso de Épocas",
        description: "Detalle constructivo que evidencia el cuidadoso diálogo entre los elementos históricos preservados y las nuevas intervenciones, mostrando la superposición de capas temporales." // Nueva imagen y descripción expandida
      },
       {
        image: "/plazuela-santiago-5.png", // Imagen añadida
        title: "Suelos Originales Restaurados",
        description: "Vista de los suelos de madera o baldosa hidráulica originales, que han sido cuidadosamente restaurados para conservar su valor histórico y aportar carácter único al apartamento." // Nueva imagen y descripción expandida
      }
    ], // 5 items
    insights: { // Original
      vision: "Fusionar la historia del edificio con las necesidades modernas de habitabilidad.",
      challenge: "Mantener la integridad estructural y estética del edificio mientras se actualizan sus instalaciones."
    }
  },
   page7: {
    id: "page7",
    projectName: "Nueva School Science and Environmental Center",
    title: "Centro de Ciencias y Medio Ambiente", // Original
    image: "/nueva-school-principal.png",
    thumbnail: "/nueva-school-principal.png",
    description: "Edificio educativo que promueve el aprendizaje sostenible y la conexión con la naturaleza.", // Original
    uniqueText: "El Centro de Ciencias y Medio Ambiente de la Nueva School está diseñado para inspirar a los estudiantes a través de espacios que fomentan la curiosidad científica y el respeto por el medio ambiente.", // Original
    details: [
      { label: "Ubicación", value: "Hillsborough, California, EE. UU." },
      { label: "Área", value: "2,000 m²" },
      { label: "Año de finalización", value: "2022" }
    ],
    team: [
      { label: "Arquitectos", value: "LMS Architects" },
      { label: "Fotografía", value: "Bruce Damonte" }
    ],
    gallery: [
      {
        image: "/nueva-school-1.png",
        title: "Fachada Integrada al Entorno", // Título ajustado
        description: "El diseño exterior utiliza materiales naturales y formas orgánicas para integrarse suavemente en el paisaje del campus, minimizando su impacto visual y conectando con la naturaleza." // Descripción expandida
      },
      {
        image: "/nueva-school-2.png",
        title: "Laboratorios Flexibles y Modernos", // Título ajustado
        description: "Los espacios de laboratorio son luminosos, tecnológicamente equipados y altamente flexibles para adaptarse a diversas actividades de aprendizaje práctico, experimentación e investigación." // Descripción expandida
      },
      {
        image: "/nueva-school-3.png",
        title: "Áreas Comunes para Colaborar", // Título ajustado
        description: "Zonas de encuentro informales y espacios de estudio están diseñados para fomentar la colaboración, el intercambio de ideas y el aprendizaje entre pares y con los docentes." // Descripción expandida
      },
       {
        image: "/nueva-school-4.png", // Imagen añadida
        title: "Aulas Abiertas al Aprendizaje Exterior",
        description: "Las aulas cuentan con grandes ventanales y acceso directo a zonas exteriores, facilitando el aprendizaje experiencial y la observación directa del medio ambiente." // Nueva imagen y descripción expandida
      },
      {
        image: "/nueva-school-5.png", // Imagen añadida
        title: "Sostenibilidad como Herramienta Educativa",
        description: "El edificio incorpora estrategias de diseño sostenible visibles, como techos verdes o sistemas de gestión de agua, que funcionan también como elementos pedagógicos para los estudiantes." // Nueva imagen y descripción expandida
      }
    ], // 5 items
    insights: { // Original
      vision: "Crear un entorno educativo que refleje los valores de sostenibilidad y aprendizaje activo.",
      challenge: "Diseñar un edificio que cumpla con altos estándares ecológicos sin comprometer la funcionalidad educativa."
    }
  },
  page8: {
    id: "page8",
    projectName: "Alica Bakery",
    title: "Panadería Contemporánea en Dubái", // Original
    image: "/alica-bakery-principal.png",
    thumbnail: "/alica-bakery-principal.png",
    description: "Espacio comercial que combina diseño moderno con elementos tradicionales de panadería.", // Original
    uniqueText: "Alica Bakery ofrece una experiencia sensorial donde el diseño interior realza la presentación de productos artesanales, creando un ambiente acogedor y sofisticado.", // Original
    details: [
      { label: "Ubicación", value: "Dubái, Emiratos Árabes Unidos" },
      { label: "Área", value: "150 m²" },
      { label: "Año de finalización", value: "2024" }
    ],
    team: [
      { label: "Arquitectos", value: "Studio Etienne Bastormagi" },
      { label: "Fotografía", value: "Alessandro Fagioli" }
    ],
    gallery: [
      {
        image: "/alica-bakery-1.png",
        title: "Mostrador Principal Elegante", // Título ajustado
        description: "El mostrador central se diseña como una pieza escultórica, utilizando materiales nobles y una iluminación cuidada para destacar la calidad y presentación de los productos horneados." // Descripción expandida
      },
      {
        image: "/alica-bakery-2.png",
        title: "Área de Clientes Confortable", // Título ajustado
        description: "Se crea un espacio de estancia agradable y estéticamente cuidado para que los clientes disfruten de los productos in situ o esperen cómodamente sus pedidos." // Descripción expandida
      },
      {
        image: "/alica-bakery-3.png",
        title: "Iluminación Cálida y Atmosférica", // Título ajustado
        description: "Una estudiada combinación de luminarias crea una atmósfera cálida y acogedora, poniendo en valor tanto la arquitectura del local como los productos expuestos." // Descripción expandida
      },
      {
        image: "/alica-bakery-4.png", // Imagen añadida
        title: "Detalle de Texturas Naturales",
        description: "El uso de materiales como madera, terrazo y revocos con textura aporta calidez y un contrapunto artesanal al diseño general contemporáneo y minimalista." // Nueva imagen y descripción expandida
      }
    ], // 4 items
    insights: { // Original
      vision: "Diseñar un espacio comercial que refleje la calidad artesanal de los productos ofrecidos.",
      challenge: "Integrar elementos tradicionales de panadería en un diseño contemporáneo atractivo para una clientela diversa."
    }
  },
  page9: {
    id: "page9",
    projectName: "Nirvana House",
    title: "Residencia Sustentable en Pilar", // Original
    image: "/nirvana-house-principal.png",
    thumbnail: "/nirvana-house-principal.png",
    description: "Casa unifamiliar que armoniza diseño moderno con principios de sostenibilidad.", // Original
    uniqueText: "Nirvana House es una manifestación de arquitectura consciente, donde cada elemento está pensado para minimizar el impacto ambiental y maximizar el confort de sus habitantes.", // Original
    details: [
      { label: "Ubicación", value: "Pilar, Argentina" },
      { label: "Área", value: "400 m²" },
      { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitectos", value: "AtelierM" },
      { label: "Fotografía", value: "AtelierM" }
    ],
    gallery: [
      {
        image: "/nirvana-house-1.png",
        title: "Fachada Principal Moderna", // Título ajustado
        description: "El diseño exterior se caracteriza por líneas puras y volúmenes claros, utilizando materiales sostenibles y de bajo mantenimiento que se integran con el paisaje circundante." // Descripción expandida
      },
      {
        image: "/nirvana-house-2.png",
        title: "Espacios Interiores Fluidos", // Título ajustado
        description: "Los ambientes interiores son amplios y luminosos, diseñados con flexibilidad y conectados visualmente para maximizar la sensación de espacio y la entrada de luz natural." // Descripción expandida
      },
      {
        image: "/nirvana-house-3.png",
        title: "Patio Central Verde", // Título ajustado
        description: "Un patio central ajardinado actúa como pulmón de la casa, articulando los espacios, mejorando la ventilación e introduciendo un elemento natural en el corazón del hogar." // Descripción expandida
      },
       {
        image: "/nirvana-house-4.png", // Imagen añadida
        title: "Diseño Pasivo Eficiente",
        description: "Se aprecian elementos como aleros, protecciones solares y una estudiada orientación que forman parte de las estrategias de diseño pasivo para optimizar el confort térmico de forma natural." // Nueva imagen y descripción expandida
      },
      {
        image: "/nirvana-house-5.png", // Imagen añadida
        title: "Integración de Energías Limpias",
        description: "Vista de la integración de sistemas como paneles solares fotovoltaicos o colectores solares térmicos, que reducen la huella de carbono y la dependencia energética de la vivienda." // Nueva imagen y descripción expandida
      },
      {
        image: "/nirvana-house-6.png", // Imagen añadida
        title: "Materiales Ecológicos y Saludables",
        description: "Detalle del uso de materiales de construcción de bajo impacto ambiental, reciclados o naturales (maderas certificadas, aislantes, pinturas), que contribuyen a un ambiente interior saludable." // Nueva imagen y descripción expandida
      }
    ], // 6 items
    insights: { // Original
      vision: "Crear un hogar que sirva como refugio y esté en sintonía con la naturaleza.",
      challenge: "Implementar soluciones sostenibles sin comprometer el diseño estético y funcional."
    }
  },
   page10: {
    id: "page10",
    projectName: "De Amicis 154 Residential Building",
    title: "Residencial De Amicis 154", // Original
    image: "/de-amicis-154-principal.png",
    thumbnail: "/de-amicis-154-principal.png",
    description: "Edificio residencial contemporáneo en el centro de Milán, caracterizado por una fachada tridimensional que reinterpreta el estilo tradicional.", // Original
    uniqueText: "Ubicado en la elegante zona de Porta Genova en Milán, este edificio combina innovación arquitectónica con sensibilidad urbana. La fachada, compuesta por elementos modulares prefabricados de GRC, responde a las condiciones de luz y sombra de su entorno y ofrece una nueva lectura del ritmo clásico de las fachadas urbanas.", // Original
    details: [
      { label: "Ubicación", value: "Milán, Italia" },
      { label: "Área", value: "1,330 m²" },
      { label: "Año de finalización", value: "2023" }
    ],
    team: [
      { label: "Arquitectos", value: "Giovanni Vaccarini Architetti" },
      { label: "Fotografía", value: "Anna Positano, Gaia Cambiaggi / Studio Campo" },
      { label: "Cliente", value: "Impresa Rusconi" },
      { label: "Estructuras", value: "Studio Speri" },
      { label: "Plantas", value: "CZA Cino Zucchi Architetti" }
    ],
    gallery: [
      {
        image: "/de-amicis-154-1.png",
        title: "Fachada Modular y Vibrante", // Título ajustado
        description: "La piel del edificio, formada por paneles prefabricados de GRC con distintas profundidades, crea un dinámico juego de luces, sombras y texturas que cambia a lo largo del día." // Descripción expandida
      },
      {
        image: "/de-amicis-154-2.png",
        title: "Inserción Urbana Respetuosa", // Título ajustado
        description: "El edificio se integra en el tejido urbano milanés de forma contemporánea pero respetuosa, dialogando con las alturas y ritmos de las edificaciones colindantes." // Descripción expandida
      },
      {
        image: "/de-amicis-154-3.png",
        title: "Detalle Prefabricado Elegante", // Título ajustado
        description: "Primer plano que revela la precisión del diseño y la ejecución de los módulos de GRC, combinando innovación técnica en prefabricación con una notable elegancia formal." // Descripción expandida
      },
      {
        image: "/de-amicis-154-4.png", // Imagen añadida
        title: "Balcones Integrados Discretamente",
        description: "Los balcones se incorporan de forma sutil en la modulación de la fachada, ofreciendo espacios exteriores privados sin interrumpir la lectura continua de la envolvente." // Nueva imagen y descripción expandida
      },
       {
        image: "/de-amicis-154-5.png", // Imagen añadida
        title: "Contraste Material: GRC y Vidrio",
        description: "El juego visual entre la solidez texturizada del GRC y la transparencia reflectante del vidrio define el carácter contemporáneo y sofisticado de la fachada." // Nueva imagen y descripción expandida
      }
    ], // 5 items
    insights: { // Original
      vision: "Crear una arquitectura residencial que dialogue con el contexto urbano mediante soluciones contemporáneas e inteligentes.",
      challenge: "Diseñar una envolvente arquitectónica prefabricada que combine eficiencia constructiva con valor estético y contextual."
    }
  },
  page11: {
    id: "page11",
    projectName: "Akashi Residence",
    title: "Residencia Akashi", // Original
    image: "/akashi-residence-principal.png",
    thumbnail: "/akashi-residence-principal.png",
    description: "Residencia unifamiliar en Bali que celebra el movimiento, la luz y la conexión con la naturaleza.", // Original
    uniqueText: "Ubicada en la pintoresca aldea de Pererenan, Bali, la Akashi Residence es una casa de seis habitaciones diseñada con principios arquitectónicos modernos y un espíritu de creatividad y exploración. La vivienda se define por su audaz vacío central, un elemento arquitectónico que aporta luz natural, aire y una sensación de apertura al corazón del hogar.", // Original
    details: [
      { label: "Ubicación", value: "Pererenan, Indonesia" },
      { label: "Área", value: "1,385 m²" },
      { label: "Año de finalización", value: "2024" }
    ],
    team: [
      { label: "Arquitecto", value: "Alexis Dornier" },
      { label: "Diseño de interiores", value: "Severiano, Alexis Dornier" },
      { label: "Consultores de paisaje", value: "Bali Landscape Company" },
      { label: "Construcción", value: "Adi Jaya Utama" },
      { label: "Fotografía", value: "KIE" }
    ],
    gallery: [
      {
        image: "/akashi-residence-1.png",
        title: "Fachada Principal Orgánica", // Título ajustado
        description: "Vista exterior que muestra la compleja volumetría de la residencia y su integración fluida con el paisaje tropical circundante, utilizando formas curvas y materiales naturales." // Descripción expandida
      },
      {
        image: "/akashi-residence-2.png",
        title: "Vacío Central Articulador", // Título ajustado
        description: "El impresionante vacío central funciona como el corazón de la casa, trayendo luz y ventilación al interior y conectando visual y espacialmente los diferentes niveles y alas." // Descripción expandida
      },
      {
        image: "/akashi-residence-3.png",
        title: "Tobogán Escultórico Lúdico", // Título ajustado
        description: "Un inesperado tobogán de diseño escultórico conecta elegantemente los niveles superiores e inferiores, añadiendo un elemento de juego y dinamismo a la experiencia espacial." // Descripción expandida
      },
      {
        image: "/akashi-residence-4.png",
        title: "Piscina Tranquila y Reflexiva", // Título ajustado
        description: "La amplia y serena piscina exterior ofrece un contrapunto de calma a la dinámica interior, creando un espacio perfecto para la relajación y el disfrute del entorno." // Descripción expandida
      },
      {
        image: "/akashi-residence-5.png",
        title: "Interiores Abiertos al Paisaje", // Título ajustado
        description: "Los espacios interiores se caracterizan por su apertura y fluidez, fomentando la interacción y manteniendo una conexión constante, visual y física, con la exuberante naturaleza balinesa." // Descripción expandida
      },
       {
        image: "/akashi-residence-6.png", // Imagen añadida
        title: "Puentes y Pasarelas Interiores",
        description: "Elementos como puentes y pasarelas cruzan el vacío central en los niveles superiores, añadiendo complejidad espacial y conectando las distintas áreas de la vivienda de forma dinámica." // Nueva imagen y descripción expandida
      }
    ], // 6 items
    insights: { // Original
      vision: "Diseñar una vivienda que combine principios arquitectónicos modernos con un espíritu de creatividad y exploración, celebrando el movimiento, la luz y la conexión con la naturaleza.",
      challenge: "Integrar elementos lúdicos y dinámicos en el diseño residencial sin comprometer la funcionalidad y la armonía con el entorno natural."
    }
  }
}; // Cierre del objeto pageData

// Exporta también una lista para facilitar el mapeo en ProjectsPage
export const projectList = Object.values(pageData);