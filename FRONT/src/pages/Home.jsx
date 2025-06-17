import React from "react";
import "../index.css";
// Paso 1: Importar Link de react-router-dom
import { Link } from "react-router-dom";
import phoneImage from "../assets/Telefono-01.png";
import logoImage from "../assets/Imagologo_motion.svg";

const Home = () => {
  // Puedes ajustar el tamaño de la imagen aquí
  const logoStyle = {
    position: 'absolute', // Para posicionarla respecto al contenedor más cercano con posición relativa/absoluta/fija
    top: '30px',          // Espacio desde la parte superior
    left: '-10px',         // Espacio desde la izquierda
    width: '150px',       // Ancho deseado para la imagen (puedes cambiarlo)
    height: '40px'        // Mantiene la proporción de la imagen
  };

  return (
    <div className="home-container">
  <div className="animated-background"></div>

  <img src={logoImage} alt="Logo" style={logoStyle} />
  
  <div className="text-background">
    <div className="main-title">BIENVENIDO A</div>
  </div>

  <div className="subtitle">
    MONITO<span className="highlight-ringinn">RING INN</span>OVATION
  </div>

  {/* Paso 2: Envolver la imagen con el componente Link */}
  <Link to="/crud"> {/* Paso 3: Especificar la ruta al CRUD. Cambia "/crud" si tu ruta es diferente */}
    <img 
      src={phoneImage} 
      alt="Teléfono - Ir al CRUD" 
      className="phone-img" 
      style={{ cursor: 'pointer' }} /> 
  </Link>

  <div className="links">
    <a href="https://monitoringinnovation.com/" target="_blank">MONITORINGINNOVATION</a>
    <a href="https://gpscontrol.co/" target="_blank">GPS CONTROL</a>
    <a href="https://github.com/Catalinaaaax/Prueba-tecnica/tree/main/FRONT" target="_blank">Link repo front</a>
    <a href="https://github.com/Catalinaaaax/Prueba-tecnica/tree/main/BACKEND" target="_blank">Link repo back</a>
  </div>
</div>

  );
};

export default Home;
