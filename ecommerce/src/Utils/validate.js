const validate = (name, value) => {
    let errorMessages = {};

    switch (name) {
        case 'name':
            errorMessages[name] = (value.length < 3) ? 'El nombre debe contener al menos 3 caracteres' : '';
            break;

        case 'lastName':
            errorMessages[name] = (value.length < 3) ? 'El apellido debe contener al menos 3 caracteres' : '';
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errorMessages[name] = (!emailRegex.test(value)) ? 'Debe ingresar un email válido' : '';
            break;

        case 'password':
            const passErrors = [];

            if (value.length < 6 || value.length > 25) passErrors.push('Debe contener entre 6 y 25 caracteres');
            if (!/[a-z]/.test(value)) passErrors.push('Debe ingresar al menos una letra minúscula');
            if (!/[A-Z]/.test(value)) passErrors.push('Debe ingresar al menos una letra mayúscula');
            if (!/\d/.test(value)) passErrors.push('Debe ingresar al menos un número');
            if (!/[#$%&!?@]/.test(value)) passErrors.push('Debe contener al menos un símbolo (#$%&!?@)');
            errorMessages[name] = (passErrors.length > 0) ? passErrors : '';
            break;

        default:
            break;
    }

    return errorMessages;      //  devuelve un objeto con el campo examinado y el error, si existe 
};

const validateForm = (form) => {

    let validateErrors = {};
    for (const key in form) {
        const fieldErrors = validate(key, form[key]);
        if (fieldErrors[key]) {
            validateErrors[key] = fieldErrors[key];
        }
    }

    return validateErrors;      //devuelve un objeto con los errores, un objeto vacio si no hay errores
};

export { validate, validateForm };