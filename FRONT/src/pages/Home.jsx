import Logo from '../assets/Imagologo_motion.svg';
import Telefono from '../assets/Telefono-01.png';

export default function Home() {
  return (
    <div className="home-landing">
      <img src={Logo} alt="Logo Motion" className="logo-top" />
      <div className="main-content">
        <div className="hero-stack-container">
          <h1 className="hero-title">
            <span className="title-left">BIEN</span>
            <span className="title-right">IDO A</span>
          </h1>
          <img src={Telefono} alt="Teléfono" className="telefono-stack-img" />
          <h2 className="hero-subtitle">
            MONITORING INNOVATION
          </h2>
        </div>
      </div>
      <div className="footer-links">
        <a href="https://monitoringinnovation.com/" target="_blank" rel="noopener noreferrer">
          MONITORINGINNOVATION
        </a>
        <a href="https://gpscontrol.co/" target="_blank" rel="noopener noreferrer">
          GPS CONTROL
        </a>
        <a href="https://github.com/TU_REPO_FRONTEND" target="_blank" rel="noopener noreferrer">
          Link repo front
        </a>
        <a href="https://github.com/TU_REPO_BACKEND" target="_blank" rel="noopener noreferrer">
          Link repo back
        </a>
      </div>
      <div className="curve-shadow"></div>
    </div>
  );
}