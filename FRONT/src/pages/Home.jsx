import React from "react";
import "../index.css";
import phoneImage from "../assets/Telefono-01.png";
import logoImage from "../assets/Imagologo_motion.svg";

const Home = () => {
  return (
    <div className="home-container">
      {/* Texto de fondo */}
      <div className="text-background">
        <div className="main-title">BIENVENIDO A</div>
      </div>

      {/* Texto por delante de la imagen */}
      <div className="subtitle">MONITORING INNOVATION</div>

      {/* Imagen del teléfono */}
      <img src={phoneImage} alt="Phone" className="phone-img" />

      {/* Enlaces inferiores */}
      <div className="links">
        <a href="https://monitoringinnovation.com/" target="_blank">MONITORINGINNOVATION</a>
        <a href="https://gpscontrol.co/" target="_blank">GPS CONTROL</a>
        <a href="https://github.com/Catalinaaaax/Prueba-tecnica/tree/main/FRONT"target="_blank">Link repo front</a>
        <a href="https://github.com/Catalinaaaax/Prueba-tecnica/tree/main/BACKEND}"target="_blank">Link repo back</a>
      </div>
    </div>
  );
};

export default Home;
