import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RabbitForm.css';

const RabbitForm = () => {
    const [race, setRace] = useState('');
    const [code, setCode] = useState('');
    const [sex, setSex] = useState('macho');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [purpose, setPurpose] = useState('Reproducción');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Validaciones
        if (!race || !code || !age || !weight || !purpose) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        // Validar código según la raza seleccionada
        let expectedLetter = '';
        if (race === 'rex') expectedLetter = 'R';
        else if (race === 'lionhead') expectedLetter = 'L';
        else if (race === 'danes') expectedLetter = 'D';

        const codeRegex = new RegExp(`^${expectedLetter}\\d{3}$`);
        if (!codeRegex.test(code)) {
            setError(`El código debe comenzar con "${expectedLetter}" seguido de tres dígitos (ej: ${expectedLetter}001) según la raza seleccionada.`);
            return;
        }

        if (age < 0 || age > 12) {
            setError('La edad debe estar entre 0 y 12 meses.');
            return;
        }
        if (weight <= 0 || weight > 2.5) {
            setError('El peso debe ser un número positivo y no superar los 2.5 kg.');
            return;
        }

        try {
            await axios.post('/api/rabbits', {
                race,
                code,
                sex,
                age,
                weight,
                purpose,
            });
            setMessage('Conejo registrado con éxito.');
            setRace('');
            setCode('');
            setSex('macho');
            setAge('');
            setWeight('');
            setPurpose('Reproducción');
        } catch (err) {
            setError('Error al registrar el conejo. Intente más tarde.');
        }
    };

    return (
        <div className="rabbit-form-container">
            <div className="rabbit-form-card">
                <h2>Registrar Conejo</h2>
                <form onSubmit={handleSubmit} className="rabbit-form">
                    <div className="form-group">
                        <label>Raza:</label>
                        <select value={race} onChange={(e) => setRace(e.target.value)} required>
                            <option value="">Seleccione una raza</option>
                            <option value="rex">Rex</option>
                            <option value="lionhead">Lionhead</option>
                            <option value="danes">Danés</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Código:</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="Ej: R001"
                            maxLength={4}
                            required
                        />
                        <small className="help-text">
                            Formato: Primera letra de la raza y tres dígitos (ej: R001)
                        </small>
                    </div>
                    <div className="form-group">
                        <label>Sexo:</label>
                        <select value={sex} onChange={(e) => setSex(e.target.value)} required>
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Edad (meses):</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min={0}
                            max={12}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Peso (kg):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            min={0.01}
                            max={2.5}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Propósito:</label>
                        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} required>
                            <option value="Reproducción">Reproducción</option>
                            <option value="Engorde">Engorde</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">Registrar Conejo</button>
                </form>
                {message && <p className="success-msg">{message}</p>}
                {error && <p className="error-msg">{error}</p>}
            </div>
        </div>
    );
};

export default RabbitForm;