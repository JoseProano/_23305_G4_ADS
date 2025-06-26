import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../styles/SidebarMenu.css';

const SidebarMenu = () => {
  const [openCage, setOpenCage]     = useState(false);
  const [openRace, setOpenRace]     = useState(false);
  const history                     = useHistory();
  const location                    = useLocation();

  const handleBack = () => {
    setOpenCage(false);
    setOpenRace(false);
    history.push('/');
  };

  // Menú Jaulas
  if (
    openCage ||
    ['/register-cage', '/edit-cage', '/delete-cage'].includes(location.pathname)
  ) {
    return (
      <div className="sidebar-menu">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <h2>Gestionar Jaulas</h2>
        <ul>
          <li><Link to="/register-cage">Registrar Jaula</Link></li>
          <li><Link to="/edit-cage">Editar Jaula</Link></li>
          <li><Link to="/delete-cage">Eliminar Jaula</Link></li>
        </ul>
      </div>
    );
  }

  // Menú Razas
  if (
    openRace ||
    ['/register-race', '/edit-race', '/delete-race'].includes(location.pathname)
  ) {
    return (
      <div className="sidebar-menu">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <h2>Gestionar Razas</h2>
        <ul>
          <li><Link to="/register-race">Registrar Raza</Link></li>
          <li><Link to="/edit-race">Editar Raza</Link></li>
          <li><Link to="/delete-race">Eliminar Raza</Link></li>
        </ul>
      </div>
    );
  }

  // Menú Principal
  return (
    <div className="sidebar-menu">
      <ul>
        <li>
          <button className="main-tab" onClick={() => setOpenCage(true)}>
            <span className="main-tab-icon">🗄️</span>
            Gestionar Jaulas
          </button>
        </li>
        <li>
          <button className="main-tab" onClick={() => setOpenRace(true)}>
            <span className="main-tab-icon">🏷️</span>
            Gestionar Razas
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
