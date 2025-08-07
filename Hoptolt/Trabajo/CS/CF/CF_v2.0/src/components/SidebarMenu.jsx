import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../styles/SidebarMenu.css';

const SidebarMenu = () => {
  const [openCage, setOpenCage]     = useState(false);
  const [openRace, setOpenRace]     = useState(false);
  const [openRabbit, setOpenRabbit] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openMating, setOpenMating] = useState(false); // <-- agregar estado
  const history                     = useHistory();
  const location                    = useLocation();

  const handleBack = () => {
    setOpenCage(false);
    setOpenRace(false);
    setOpenRabbit(false);
    setOpenAssign(false);
    setOpenMating(false); // <-- agregar aquí
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

  // Menú Conejos
  if (
    openRabbit ||
    ['/register-rabbit', '/edit-rabbit', '/delete-rabbit'].includes(location.pathname)
  ) {
    return (
      <div className="sidebar-menu">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <h2>Gestionar Conejos</h2>
        <ul>
          <li><Link to="/register-rabbit">Registrar Conejo</Link></li>
          <li><Link to="/edit-rabbit">Editar Conejo</Link></li>
          <li><Link to="/delete-rabbit">Eliminar Conejo</Link></li>
        </ul>
      </div>
    );
  }

  // Menú Asignar Conejo a Jaula
  if (
    openAssign ||
    ['/assign-rabbit-cage'].includes(location.pathname)
  ) {
    return (
      <div className="sidebar-menu">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <h2>Asignar Conejo a Jaula</h2>
      </div>
    );
  }

  // Menú Reproducción y Parto
  if (
    openMating ||
    ['/mating-register', '/mating-delete'].includes(location.pathname)
  ) {
    return (
      <div className="sidebar-menu">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <h2>Gestionar Reproducción y Parto</h2>
        <ul>
          <li>
            <Link to="/mating-register" className="submenu-link">
              Registrar Monta
            </Link>
          </li>
          <li>
            <Link to="/mating-delete" className="submenu-link">
              Eliminar Parto
            </Link>
          </li>
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
        <li>
          <button className="main-tab" onClick={() => setOpenRabbit(true)}>
            <span className="main-tab-icon">🐰</span>
            Gestionar Conejos
          </button>
        </li>
        <li>
          <button
            className="main-tab"
            onClick={() => {
              setOpenAssign(true);
              history.push('/assign-rabbit-cage');
            }}
          >
            <span className="main-tab-icon">🔗</span>
            Asignar Conejo a Jaula
          </button>
        </li>
        <li>
          <button className="main-tab" onClick={() => setOpenMating(true)}>
            <span className="main-tab-icon">🐇</span>
            Gestionar Reproducción y Parto
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
