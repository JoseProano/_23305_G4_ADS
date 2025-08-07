import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../styles/SidebarMenu.css'; 

const SidebarMenu = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const location = useLocation();

    const handleBack = () => {
        setOpen(false);
        history.push('/');
    };

    // Si estamos en /assign-rabbit, solo mostrar botón volver y mensaje
    if (location.pathname === '/assign-rabbit') {
        return (
            <div className="sidebar-menu">
                <button
                    className="back-btn"
                    onClick={() => history.push('/')}
                >
                    ← Volver
                </button>
                <h2>Asignar Jaula a Conejo</h2>
            </div>
        );
    }
    if (location.pathname === '/food-control') {
        return (
            <div className="sidebar-menu">
                <button
                    className="back-btn"
                    onClick={() => history.push('/')}
                >
                    ← Volver
                </button>
                <h2>Control Alimentación</h2>
            </div>
        );
    }

    // Si está abierto el menú de gestionar, solo mostrar botón volver y secundarios
    if (open || location.pathname === '/register' || location.pathname === '/edit' || location.pathname === '/delete') {
        return (
            <div className="sidebar-menu">
                <button
                    className="back-btn"
                    onClick={handleBack}
                >
                    ← Volver
                </button>
                <h2>Gestionar Datos Conejos</h2>
                <ul>
                    <li>
                        <Link to="/register">Registrar Conejo</Link>
                    </li>
                    <li>
                        <Link to="/edit">Editar Conejo</Link>
                    </li>
                    <li>
                        <Link to="/delete">Eliminar Conejo</Link>
                    </li>
                </ul>
            </div>
        );
    }

    // Menú principal
    return (
        <div className="sidebar-menu">
            <ul>
                <li>
                    <button
                        className="main-tab"
                        onClick={() => setOpen(true)}
                    >
                        <span className="main-tab-icon">🐇</span>
                        Gestionar Datos Conejos
                    </button>
                </li>
                <li>
                    <button
                        className="main-tab"
                        onClick={() => history.push('/assign-rabbit')}
                    >
                        <span className="main-tab-icon">🗄️</span>
                        Asignar Jaula a Conejo
                    </button>
                </li>
                <li>
                    <button
                        className="main-tab"
                        onClick={() => history.push('/food-control')}
                    >
                        <span className="main-tab-icon">📋</span>
                        Control Alimentación
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SidebarMenu;