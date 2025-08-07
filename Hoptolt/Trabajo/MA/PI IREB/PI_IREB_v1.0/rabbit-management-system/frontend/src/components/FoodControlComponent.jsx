import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FoodControl.css';

const validateCode = (code) => /^[a-zA-Z0-9]+$/.test(code);

const FoodControlComponent = () => {
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState('');
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [camposVacios, setCamposVacios] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); // 'error' o 'success'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rabbitsRes, assignmentsRes] = await Promise.all([
                    axios.get('/api/rabbits'),
                    axios.get('/api/assignments')
                ]);
                const assignments = assignmentsRes.data;

                // Crear un mapa de código de conejo a número de jaula
                const codeToCage = {};
                assignments.forEach(a => {
                    if (a.status === 'asignado') {
                        codeToCage[a.rabbitCode] = a.cageNumber;
                    }
                });

                // Filtrar solo los conejos que tienen asignación
                const conejos = rabbitsRes.data
                    .filter(rabbit => codeToCage[rabbit.code])
                    .map(rabbit => ({
                        id: rabbit._id,
                        jaula: codeToCage[rabbit.code],
                        codigo: rabbit.code,
                        edad: rabbit.age,
                        peso: rabbit.weight,
                        heno: '',
                        hierba: '',
                        balanceado: '',
                        seleccionado: false,
                    }));
                setDatos(conejos);
            } catch (err) {
                setError('Error al cargar los conejos o asignaciones');
            } finally {
                setCargando(false);
            }
        };
        fetchData();
    }, []);

    const handleBusqueda = (e) => {
        const value = e.target.value;
        if (value === '' || validateCode(value)) {
            setBusqueda(value);
            setError('');
        } else {
            setError('Solo se permiten letras y números.');
        }
    };

    const handleEdit = (id, campo, valor) => {
        setDatos(datos.map(row =>
            row.id === id
                ? { ...row, [campo]: valor.replace(/[^0-9.]/g, ''), seleccionado: true }
                : row
        ));
    };

    const datosFiltrados = datos.filter(row =>
        row.codigo && row.codigo.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleSeleccionarTodo = () => {
        const todosSeleccionados = datosFiltrados.length > 0 && datosFiltrados.every(row => row.seleccionado);
        setDatos(datos.map(row =>
            datosFiltrados.some(f => f.id === row.id)
                ? { ...row, seleccionado: !todosSeleccionados }
                : row
        ));
    };

    const handleSeleccionar = (id) => {
        setDatos(datos.map(row =>
            row.id === id ? { ...row, seleccionado: !row.seleccionado } : row
        ));
    };

    const handleRegistrar = async () => {
        const seleccionados = datos.filter(row => row.seleccionado);
        const porcentajeSeleccionados = (seleccionados.length / datos.length) * 100;

        // Validar porcentaje de selección
        if (porcentajeSeleccionados < 90) {
            setMensaje('Debes seleccionar al menos el 90% de los conejos para registrar la alimentación.');
            setTipoMensaje('error');
            return;
        }

        // Validar campos vacíos
        let vacios = {};
        let hayVacios = false;
        seleccionados.forEach(row => {
            let vacioRow = {};
            if (!row.heno) vacioRow.heno = true;
            if (!row.hierba) vacioRow.hierba = true;
            if (!row.balanceado) vacioRow.balanceado = true;
            if (Object.keys(vacioRow).length > 0) {
                vacios[row.id] = vacioRow;
                hayVacios = true;
            }
        });

        setCamposVacios(vacios);

        if (hayVacios) {
            setMensaje('Todos los campos de alimentación deben estar completos para los conejos seleccionados.');
            setTipoMensaje('error');
            return;
        }
        

        try {
            for (const row of seleccionados) {
                await axios.post('/api/register-feeding', {
                    codigo: row.codigo,
                    heno: Number(row.heno) || 0,
                    hierba: Number(row.hierba) || 0,
                    balanceado: Number(row.balanceado) || 0
                });
            }
            setMensaje('¡Alimentación registrada!');
            setTipoMensaje('success');
            setCamposVacios({});
            setDatos(datos.map(row =>
                row.seleccionado
                    ? { ...row, heno: '', hierba: '', balanceado: '', seleccionado: false }
                    : row
            ));
        } catch (error) {
            setMensaje('Error al registrar la alimentación');
            setTipoMensaje('error');
        }
    };

    return (
        <div className="food-control-container">
            <h2>Control de Alimentación</h2>
            <div className="search-section">
                <label htmlFor="search-code">Buscar por código de conejo:</label>
                <input
                    id="search-code"
                    type="text"
                    value={busqueda}
                    onChange={handleBusqueda}
                    placeholder="Ingrese código"
                    autoComplete="off"
                />
                {error && <span className="error">{error}</span>}
            </div>
            <div className="table-section">
                {cargando ? (
                    <div>Cargando...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="rabbit-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Número de jaula</th>
                                    <th>Código</th>
                                    <th>Edad (meses)</th>
                                    <th>Peso (Kg)</th>
                                    <th>Heno Seco (g)</th>
                                    <th>Hierba Húmeda (g)</th>
                                    <th>Balanceado (g)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datosFiltrados.map(row => {
                                    // Cálculo de dieta y raciones sugeridas
                                    const peso = Number(row.peso) || 0;
                                    const dieta = peso * 20;
                                    const henoSeco = ((dieta * 0.7) / 2).toFixed(1);
                                    const hierbaHumeda = ((dieta * 0.2) / 2).toFixed(1);
                                    const balanceado = ((dieta * 0.1) / 2).toFixed(1);

                                    return (
                                        <tr key={row.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={row.seleccionado || false}
                                                    onChange={() => handleSeleccionar(row.id)}
                                                />
                                            </td>
                                            <td>{row.jaula || '-'}</td>
                                            <td>{row.codigo}</td>
                                            <td>{row.edad}</td>
                                            <td>{row.peso}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={row.heno}
                                                    onChange={e => handleEdit(row.id, 'heno', e.target.value)}
                                                    className={`input-table${camposVacios[row.id]?.heno ? ' input-error' : ''}${row.heno && Number(row.heno) !== Number(henoSeco) ? ' input-warning' : ''}`}
                                                    placeholder={`${henoSeco}g`}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={row.hierba}
                                                    onChange={e => handleEdit(row.id, 'hierba', e.target.value)}
                                                    className={`input-table${camposVacios[row.id]?.hierba ? ' input-error' : ''}${row.hierba && Number(row.hierba) !== Number(hierbaHumeda) ? ' input-warning' : ''}`}
                                                    placeholder={`${hierbaHumeda}g`}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={row.balanceado}
                                                    onChange={e => handleEdit(row.id, 'balanceado', e.target.value)}
                                                    className={`input-table${camposVacios[row.id]?.balanceado ? ' input-error' : ''}${row.balanceado && Number(row.balanceado) !== Number(balanceado) ? ' input-warning' : ''}`}
                                                    placeholder={`${balanceado}g`}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                {!cargando && datosFiltrados.length === 0 && <div className="no-result">No se encontraron resultados.</div>}
            </div>
            <div className="buttons-section">
                <button className="select-all-btn" onClick={handleSeleccionarTodo}>
                    <i className="fas fa-check"></i> Seleccionar todo
                </button>
                <button className="submit-btn" onClick={handleRegistrar}>Registrar alimentación</button>
            </div>
            {mensaje && (
                <div className={`mensaje-app ${tipoMensaje}`}>
                    {mensaje}
                </div>
            )}
        </div>
    );
};

export default FoodControlComponent;

