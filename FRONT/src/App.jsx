import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CrudPage from './pages/Crud';
import './index.css';

/**
 * App: Componente principal de la aplicación.
 * Configura el enrutador y define las rutas principales de la aplicación.
 * Utiliza React Router para la navegación entre las páginas Home y CrudPage.
 *
 * @returns {JSX.Element} El componente de la aplicación con las rutas configuradas.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crud" element={<CrudPage />} />
    </Routes>
  );
}

export default App;