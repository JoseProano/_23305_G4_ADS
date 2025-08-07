const Rabbit = require('../models/rabbit');

// Registrar un nuevo conejo
exports.registerRabbit = async (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { race, code, sex, age, weight, purpose } = req.body;

    // Validar entrada
    const validationErrors = validateRabbitData(req.body);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        const newRabbit = new Rabbit({ race, code, sex, age, weight, purpose });
        await newRabbit.save();
        res.status(201).json({ message: 'Conejo registrado exitosamente', rabbit: newRabbit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el conejo', error: error.message });
    }
};

// Obtener un conejo por código
exports.getRabbit = async (req, res) => {
    const { code } = req.params;

    try {
        const rabbit = await Rabbit.findOne({ code });
        if (!rabbit) {
            return res.status(404).json({ message: 'Conejo no encontrado' });
        }
        res.status(200).json(rabbit);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el conejo', error: error.message });
    }
};

// Editar un conejo
exports.editRabbit = async (req, res) => {
    const { code } = req.params;
    const { race, sex, age, weight, purpose } = req.body;

    // Validar entrada
    const validationErrors = validateRabbitData(req.body, false);
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        const updatedRabbit = await Rabbit.findOneAndUpdate(
            { code },
            { race, sex, age, weight, purpose },
            { new: true }
        );
        if (!updatedRabbit) {
            return res.status(404).json({ message: 'Conejo no encontrado' });
        }
        res.status(200).json({ message: 'Conejo actualizado exitosamente', rabbit: updatedRabbit });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el conejo', error: error.message });
    }
};

// Eliminar un conejo
exports.deleteRabbit = async (req, res) => {
    const { code } = req.params;

    try {
        const deletedRabbit = await Rabbit.findOneAndDelete({ code });
        if (!deletedRabbit) {
            return res.status(404).json({ message: 'Conejo no encontrado' });
        }
        res.status(200).json({ message: 'Conejo eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el conejo', error: error.message });
    }
};

// Obtener todos los conejos
exports.getAllRabbits = async (req, res) => {
    try {
        const rabbits = await Rabbit.find();
        res.status(200).json(rabbits);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los conejos', error: error.message });
    }
};

// Función de validación (por implementar)
const validateRabbitData = (data, isNew = true) => {
    const errors = [];
    // Agrega aquí la lógica de validación si lo deseas
    return errors;
};