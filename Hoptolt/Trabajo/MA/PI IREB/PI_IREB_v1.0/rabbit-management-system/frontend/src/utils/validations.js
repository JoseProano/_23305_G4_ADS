export const validateRabbitData = (data) => {
    const { race, code, sex, age, weight, purpose } = data;
    const errors = {};

    // Validar raza
    if (!race) {
        errors.race = "La raza es obligatoria.";
    }

    // Validar código
    const codeRegex = /^[A-Z]\d{3}$/; // Primera letra mayúscula seguida de 3 dígitos
    if (!code) {
        errors.code = "El código es obligatorio.";
    } else if (!codeRegex.test(code)) {
        errors.code = "El código debe tener el formato: primera letra seguida de tres dígitos (ej: R001).";
    }

    // Validar sexo
    if (!sex || (sex !== "macho" && sex !== "hembra")) {
        errors.sex = "El sexo debe ser 'macho' o 'hembra'.";
    }

    // Validar edad
    if (age === undefined || age < 0 || age > 12) {
        errors.age = "La edad debe ser un número entero positivo que no exceda los 12 meses.";
    }

    // Validar peso
    if (weight === undefined || weight <= 0 || weight > 2.5) {
        errors.weight = "El peso debe ser un número positivo que no exceda los 2.5 kg.";
    }

    // Validar propósito
    if (!purpose || (purpose !== "Reproducción" && purpose !== "Engorde")) {
        errors.purpose = "El propósito debe ser 'Reproducción' o 'Engorde'.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};