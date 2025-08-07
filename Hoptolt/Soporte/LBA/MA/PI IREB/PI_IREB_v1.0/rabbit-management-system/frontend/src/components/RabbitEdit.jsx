import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RabbitEdit.css';

const RabbitEdit = () => {
    const [rabbits, setRabbits] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedRabbit, setSelectedRabbit] = useState(null);
    const [editData, setEditData] = useState({
        sex: '',
        age: '',
        weight: '',
        purpose: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Obtener todos los conejos al cargar
    useEffect(() => {
        const fetchRabbits = async () => {
            try {
                const response = await axios.get('/api/rabbits');
                setRabbits(response.data);
            } catch (err) {
                setError('Error al obtener los conejos');
            }
        };
        fetchRabbits();
    }, []);

    // Cuando seleccionas un conejo, carga sus datos en el formulario
    const handleSelect = (rabbit) => {
        setSelectedRabbit(rabbit);
        setEditData({
            sex: rabbit.sex,
            age: rabbit.age,
            weight: rabbit.weight,
            purpose: rabbit.purpose
        });
        setError('');
        setMessage('');
    };

    // Filtrar conejos por código
    const filteredRabbits = rabbits.filter(r =>
        r.code.toLowerCase().includes(filter.toLowerCase())
    );

    // Manejar cambios en el formulario de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    // Guardar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await axios.put(`/api/rabbits/${selectedRabbit.code}`, editData);
            setMessage('Conejo editado correctamente');
            setRabbits(rabbits.map(r =>
                r.code === selectedRabbit.code ? { ...r, ...editData } : r
            ));
            setSelectedRabbit(null); // Cierra el formulario al guardar
        } catch (err) {
            setError('Error al editar el conejo');
        }
    };

    const handleCancel = () => {
        setSelectedRabbit(null); // Cierra el formulario al cancelar
        setError('');
        setMessage('');
    };

    return (
        <div className="rabbit-edit-container">
            <div className="rabbit-edit-card">
                <h2>Editar Conejo</h2>
                {error && <p className="error-msg">{error}</p>}
                {message && <p className="success-msg">{message}</p>}

                <div className="filter-group">
                    <label>Filtrar por código:</label>
                    <input
                        type="text"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        placeholder="Ej: R001"
                    />
                </div>

                <div className="table-responsive">
                    <table className="rabbit-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Sexo</th>
                                <th>Edad (meses)</th>
                                <th>Peso (kg)</th>
                                <th>Propósito</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRabbits.map(rabbit => (
                                <tr key={rabbit.code}>
                                    <td>{rabbit.code}</td>
                                    <td>{rabbit.sex}</td>
                                    <td>{rabbit.age}</td>
                                    <td>{rabbit.weight}</td>
                                    <td>{rabbit.purpose}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleSelect(rabbit)}>
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredRabbits.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', color: '#888' }}>
                                        No hay conejos para mostrar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {selectedRabbit && (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <h3>Editar datos de {selectedRabbit.code}</h3>
                        <div className="form-group">
                            <label>Código:</label>
                            <input type="text" value={selectedRabbit.code} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Sexo:</label>
                            <select name="sex" value={editData.sex} onChange={handleChange} required>
                                <option value="">Selecciona sexo</option>
                                <option value="macho">Macho</option>
                                <option value="hembra">Hembra</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Edad (meses):</label>
                            <input type="number" name="age" value={editData.age} onChange={handleChange} required min="0" max="12" />
                        </div>
                        <div className="form-group">
                            <label>Peso (kg):</label>
                            <input type="number" name="weight" value={editData.weight} onChange={handleChange} required step="0.01" min="0" max="2.5" />
                        </div>
                        <div className="form-group">
                            <label>Propósito:</label>
                            <select name="purpose" value={editData.purpose} onChange={handleChange} required>
                                <option value="">Selecciona propósito</option>
                                <option value="Reproducción">Reproducción</option>
                                <option value="Engorde">Engorde</option>
                            </select>
                        </div>
                        <div className="edit-form-btns">
                            <button type="submit" className="submit-btn">Guardar Cambios</button>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RabbitEdit;