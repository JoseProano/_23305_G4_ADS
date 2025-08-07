import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AssignRabbit.css';

const AssignRabbit = () => {
    const [cages, setCages] = useState([]);
    const [rabbits, setRabbits] = useState([]);
    const [selectedCage, setSelectedCage] = useState(null);
    const [selectedRabbits, setSelectedRabbits] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [rabbitFilter, setRabbitFilter] = useState('');

    // Cargar jaulas quemadas y conejos sin asignar
    useEffect(() => {
        fetchCages();
        fetchRabbits();
        fetchAssignments();
    }, []);

    const fetchCages = async () => {
        try {
            const res = await axios.get('/api/cages');
            setCages(res.data);
        } catch {
            setError('Error al cargar jaulas.');
        }
    };

    const fetchRabbits = async () => {
        try {
            const res = await axios.get('/api/rabbits');
            // Filtrar conejos ya asignados
            const assignedRes = await axios.get('/api/assignments');
            const assignedCodes = assignedRes.data.map(a => a.rabbitCode);
            setRabbits(res.data.filter(r => !assignedCodes.includes(r.code)));
        } catch {
            setError('Error al cargar conejos.');
        }
    };

    const fetchAssignments = async () => {
        try {
            const res = await axios.get('/api/assignments');
            setAssignments(res.data);
        } catch {
            setAssignments([]);
        }
    };

    const handleCageSelect = (cage) => {
        setSelectedCage(cage);
        setSelectedRabbits([]);
        setMessage('');
        setError('');
    };

    const handleRabbitSelect = (rabbit) => {
        if (!selectedCage) return;
        // Si ya está seleccionado, lo quitamos
        if (selectedRabbits.some(r => r.code === rabbit.code)) {
            setSelectedRabbits(selectedRabbits.filter(r => r.code !== rabbit.code));
        } else {
            if (selectedRabbits.length < selectedCage.cageCapacity) {
                setSelectedRabbits([...selectedRabbits, rabbit]);
            }
        }
    };

    const isRabbitSelected = (rabbit) => {
        return selectedRabbits.some(r => r.code === rabbit.code);
    };

    const handleAssign = () => {
        setMessage('');
        setError('');
        if (!selectedCage || selectedRabbits.length === 0) {
            setError('Seleccione una jaula y al menos un conejo.');
            return;
        }
        if (selectedRabbits.length > selectedCage.cageCapacity) {
            setError('No puede asignar más conejos que la capacidad de la jaula.');
            return;
        }
        setShowConfirm(true);
    };

    const confirmAssign = async () => {
        setShowConfirm(false);
        setLoading(true);
        setMessage('');
        setError('');
        try {
            // Asignar cada conejo
            for (const rabbit of selectedRabbits) {
                await axios.post('/api/assign-rabbit', {
                    cageNumber: selectedCage.cageNumber,
                    rabbitCode: rabbit.code
                });
            }
            setMessage('Asignación realizada exitosamente.');
            setSelectedCage(null);
            setSelectedRabbits([]);
            fetchRabbits();
            fetchAssignments();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al asignar.');
        }
        setLoading(false);
    };

    // Agrupar asignaciones por jaula
    const assignmentsByCage = assignments.reduce((acc, a) => {
        if (!acc[a.cageNumber]) acc[a.cageNumber] = [];
        acc[a.cageNumber].push(a);
        return acc;
    }, {});

    // Calcular cuántos conejos hay en cada jaula
    const cageOccupancy = assignments.reduce((acc, a) => {
        acc[a.cageNumber] = (acc[a.cageNumber] || 0) + 1;
        return acc;
    }, {});

    // Solo mostrar jaulas que no estén llenas
    const availableCages = cages.filter(cage =>
        (cageOccupancy[cage.cageNumber] || 0) < cage.cageCapacity
    );

    // Filtrar conejos por código
    const filteredRabbits = rabbits.filter(r =>
        r.code.toLowerCase().includes(rabbitFilter.toLowerCase())
    );

    return (
        <div className="assign-rabbit-container">
            <div className="assign-rabbit-flex">
                <div className="assign-rabbit-list">
                    <h3>Jaulas Disponibles</h3>
                    <div className="assign-rabbit-attributes-list">
                        <span className="align-cell"><strong>Número de Jaula</strong></span>
                        <span className="vertical-divider" />
                        <span className="align-cell"><strong>Tipo de Jaula</strong></span>
                        <span className="vertical-divider" />
                        <span className="align-cell"><strong>Capacidad</strong></span>
                        <span className="vertical-divider" />
                        <span className="align-cell"><strong>Ocupados</strong></span>
                    </div>
                    <ul>
                        {availableCages.map(cage => (
                            <li
                                key={cage.cageNumber}
                                className={selectedCage && selectedCage.cageNumber === cage.cageNumber ? 'selected' : ''}
                                onClick={() => handleCageSelect(cage)}
                            >
                                <span className="align-cell">{cage.cageNumber}</span>
                                <span className="vertical-divider" />
                                <span className="align-cell">{cage.cageType}</span>
                                <span className="vertical-divider" />
                                <span className="align-cell">{cage.cageCapacity}</span>
                                <span className="vertical-divider" />
                                <span className="align-cell">{cageOccupancy[cage.cageNumber] || 0}</span>
                            </li>
                        ))}
                        {availableCages.length === 0 && (
                            <li>No hay jaulas disponibles.</li>
                        )}
                    </ul>
                </div>
                <div className="assign-rabbit-list">
                    <h3>Conejos Sin Asignar</h3>
                    {/* Formulario de búsqueda */}
                    <div className="filter-group" style={{ marginBottom: 10 }}>
                        <label htmlFor="rabbit-filter">Buscar por código:</label>
                        <input
                            id="rabbit-filter"
                            type="text"
                            value={rabbitFilter}
                            onChange={e => setRabbitFilter(e.target.value)}
                            placeholder="Ej: R001"
                            style={{ marginLeft: 8 }}
                        />
                    </div>
                    <div className="assign-rabbit-attributes-list">
                        <span className="align-cell"><strong>Código</strong></span>
                        <span className="vertical-divider" />
                        <span className="align-cell"><strong>Edad (meses)</strong></span>
                        <span className="vertical-divider" />
                        <span className="align-cell"><strong>Sexo</strong></span>
                        <span className="vertical-divider" />
                        <span className="align-cell"><strong>Propósito</strong></span>
                    </div>
                    <ul>
                        {filteredRabbits.length === 0 && <li>No hay conejos disponibles.</li>}
                        {filteredRabbits.map(rabbit => (
                            <li
                                key={rabbit.code}
                                className={isRabbitSelected(rabbit) ? 'selected' : ''}
                                onClick={() => {
                                    if (selectedCage && (isRabbitSelected(rabbit) || selectedRabbits.length < selectedCage.cageCapacity)) {
                                        handleRabbitSelect(rabbit);
                                    }
                                }}
                                style={{
                                    cursor: selectedCage
                                        ? (isRabbitSelected(rabbit) || selectedRabbits.length < selectedCage.cageCapacity ? 'pointer' : 'not-allowed')
                                        : 'not-allowed',
                                    opacity: selectedCage
                                        ? (isRabbitSelected(rabbit) || selectedRabbits.length < selectedCage.cageCapacity ? 1 : 0.5)
                                        : 0.5
                                }}
                            >
                                <span className="align-cell">{rabbit.code}</span>
                                <span className="vertical-divider" />
                                <span className="align-cell">{rabbit.age}</span>
                                <span className="vertical-divider" />
                                <span className="align-cell">{rabbit.sex}</span>
                                <span className="vertical-divider" />
                                <span className="align-cell">{rabbit.purpose}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="assign-rabbit-actions">
                <button
                    className="assign-btn"
                    onClick={handleAssign}
                    disabled={!selectedCage || selectedRabbits.length === 0 || loading}
                >
                    Asignar
                </button>
            </div>
            {showConfirm && (
                <div className="assign-rabbit-confirm-modal">
                    <div className="assign-rabbit-confirm-box">
                        <div className="assign-rabbit-confirm-title">
                            ¿Está seguro de asignar los siguientes conejos a la jaula seleccionada?
                        </div>
                        <div className="assign-rabbit-confirm-details">
                            <div>
                                <strong>Jaula:</strong> {selectedCage?.cageNumber} | {selectedCage?.cageType} | Capacidad: {selectedCage?.cageCapacity}
                            </div>
                            <div>
                                <strong>Conejos:</strong>
                                <ul>
                                    {selectedRabbits.map(r => (
                                        <li key={r.code}>
                                            {r.code} | {r.age} meses | {r.sex} | {r.purpose}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="assign-rabbit-confirm-btns">
                            <button
                                className="assign-btn"
                                onClick={confirmAssign}
                                disabled={loading}
                            >
                                Confirmar
                            </button>
                            <button
                                className="assign-cancel-btn"
                                onClick={() => setShowConfirm(false)}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {message && <div className="assign-rabbit-success">{message}</div>}
            {error && <div className="assign-rabbit-error">{error}</div>}
            <div className="assignments-section">
                <h3>Asignaciones Actuales</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Jaula</th>
                            <th>Códigos Conejos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(assignmentsByCage).length === 0 && (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>
                                    No hay asignaciones.
                                </td>
                            </tr>
                        )}
                        {Object.entries(assignmentsByCage).map(([cageNumber, rabbitsArr]) => (
                            <tr key={cageNumber}>
                                <td>{cageNumber}</td>
                                <td>
                                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                                        {rabbitsArr.map(a => (
                                            <li key={a.rabbitCode} style={{ listStyle: 'disc', margin: 0, padding: 0 }}>
                                                {a.rabbitCode}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {rabbitsArr.every(a => a.status === rabbitsArr[0].status)
                                        ? rabbitsArr[0].status
                                        : 'Mixto'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignRabbit;
