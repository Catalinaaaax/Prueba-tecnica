/**
 * Botón de ícono redondo reutilizable.
 * Props:
 * - icon: ruta al ícono SVG.
 * - alt: texto alternativo para accesibilidad.
 * - color: 'blue' o 'pink' (aplica estilo de color).
 * - onClick: función al hacer click.
 * - title: texto de tooltip.
 */
const IconButton = ({ icon, alt, color = '', onClick, title }) => (
  <button
    className={`icon-btn${color ? ' ' + color : ''}`}
    onClick={onClick}
    title={title}
    type="button"
    aria-label={alt}
  >
    <img src={icon} alt={alt} />
  </button>
);

export default IconButton;