// src/components/TextFeatureSection.jsx

// Componente para texto destacado, con colores por defecto para tema oscuro
const TextFeatureSection = ({
  title,
  subtitle,
  titleSize = "text-5xl md:text-7xl lg:text-8xl",
  subtitleSize = "text-lg md:text-xl lg:text-2xl",
  className,
  // Colores por defecto usando variables semánticas
  titleColor = "text-[--color-text-primary]",      // Usa texto primario
  subtitleColor = "text-[--color-text-secondary]" // Usa texto secundario
}) => {
return (
  <div className={`text-center ${className}`}>
    {subtitle && (
      <p className={`${subtitleSize} ${subtitleColor} mb-4 md:mb-6 tracking-wide`}>
        {subtitle}
      </p>
    )}
    {title && (
      <h1 className={`${titleSize} ${titleColor} font-bold leading-tight md:leading-tight`}>
        {title}
      </h1>
    )}
  </div>
);
};

export default TextFeatureSection;
