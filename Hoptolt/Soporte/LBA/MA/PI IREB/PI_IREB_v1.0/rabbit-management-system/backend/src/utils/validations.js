const mongoose = require('mongoose');

const validateRabbitData = (data) => {
    const { race, code, sex, age, weight, purpose } = data;

    // Validar raza
    const validRaces = ['rex', 'lionhead', 'danes'];
    if (!validRaces.includes(race)) {
        return { valid: false, message: 'La raza debe ser una de las siguientes: rex, lionhead, danes.' };
    }

    // Validar código
    const codeRegex = new RegExp(`^${race.charAt(0)}\\d{3}$`);
    if (!codeRegex.test(code)) {
        return { valid: false, message: 'El código debe comenzar con la primera letra de la raza seguida de tres dígitos.' };
    }

    // Validar sexo
    const validSexes = ['macho', 'hembra'];
    if (!validSexes.includes(sex)) {
        return { valid: false, message: 'El sexo debe ser "macho" o "hembra".' };
    }

    // Validar edad
    if (!Number.isInteger(age) || age < 0 || age > 12) {
        return { valid: false, message: 'La edad debe ser un número entero entre 0 y 12 meses.' };
    }

    // Validar peso
    if (typeof weight !== 'number' || weight <= 0 || weight > 2.5) {
        return { valid: false, message: 'El peso debe ser un número positivo y no superar los 2.5 kg.' };
    }

    // Validar propósito
    const validPurposes = ['Reproducción', 'Engorde'];
    if (!validPurposes.includes(purpose)) {
        return { valid: false, message: 'El propósito debe ser "Reproducción" o "Engorde".' };
    }

    return { valid: true, message: 'Validación exitosa.' };
};

const validateCodeUniqueness = async (code) => {
    const existingRabbit = await mongoose.model('Rabbit').findOne({ code });
    if (existingRabbit) {
        return { valid: false, message: 'El código debe ser único y no existir ya en la base de datos.' };
    }
    return { valid: true };
};

module.exports = {
    validateRabbitData,
    validateCodeUniqueness,
};