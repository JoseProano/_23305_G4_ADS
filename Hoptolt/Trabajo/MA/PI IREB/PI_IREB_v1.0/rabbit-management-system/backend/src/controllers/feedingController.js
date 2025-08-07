const Feeding = require('../models/Feeding');

exports.registerFeeding = async (req, res) => {
    try {
        const { codigo, heno, hierba, balanceado } = req.body;
        const nuevaAlimentacion = new Feeding({
            codigo,
            heno,
            hierba,
            balanceado,
            fecha: new Date()
        });
        await nuevaAlimentacion.save();
        res.status(201).json({ message: 'Alimentación registrada', feeding: nuevaAlimentacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar alimentación', error: error.message });
    }
};