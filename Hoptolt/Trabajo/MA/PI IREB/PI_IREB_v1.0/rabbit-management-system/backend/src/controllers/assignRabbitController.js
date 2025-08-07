const AssignRabbit = require('../models/assignRabbit');

// Datos de jaulas quemados
const cages = [
    { cageNumber: 1, cageType: 'Reproduccion', cageCapacity: 1 },
    { cageNumber: 2, cageType: 'Engorde', cageCapacity: 4 },
    { cageNumber: 3, cageType: 'Reproduccion', cageCapacity: 1 },
    // ...puedes agregar más jaulas aquí...
];

// Listar jaulas quemadas
exports.getCages = (req, res) => {
    res.status(200).json(cages);
};

// Asignar conejo a jaula
exports.assignRabbit = async (req, res) => {
    try {
        const { cageNumber, rabbitCode } = req.body;
        const cage = cages.find(j => j.cageNumber === cageNumber);
        if (!cage) {
            return res.status(400).json({ message: 'La jaula seleccionada no existe.' });
        }
        if (!rabbitCode) {
            return res.status(400).json({ message: 'Debe proporcionar el código del conejo.' });
        }

        // Contar asignaciones actuales en la jaula
        const count = await AssignRabbit.countDocuments({ cageNumber, status: 'asignado' });
        if (count >= cage.cageCapacity) {
            return res.status(400).json({ message: 'La capacidad de la jaula ha sido superada.' });
        }

        // Verificar si el conejo ya está asignado
        const alreadyAssigned = await AssignRabbit.findOne({ rabbitCode, status: 'asignado' });
        if (alreadyAssigned) {
            return res.status(400).json({ message: 'El conejo ya está asignado a una jaula.' });
        }

        const assign = new AssignRabbit({
            cageNumber: cage.cageNumber,
            cageType: cage.cageType,
            cageCapacity: cage.cageCapacity,
            rabbitCode,
            status: 'asignado'
        });
        await assign.save();
        res.status(201).json({ message: 'Asignación registrada exitosamente.', assign });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar conejo a jaula.', error: error.message });
    }
};

// Listar asignaciones jaula-conejo
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await AssignRabbit.find({ status: 'asignado' });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener asignaciones.', error: error.message });
    }
};
