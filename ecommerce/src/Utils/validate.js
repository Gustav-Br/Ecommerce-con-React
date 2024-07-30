const validate = (name, value) => {
    let errorMessages = {};

    switch (name) {
        case 'name':
            if (value.length < 3) {
                errorMessages[name] = 'El nombre debe contener al menos 3 caracteres';
            } else {
                errorMessages[name] = '';
            }
            break;

        case 'lastName':
            if (value.length < 3) {
                errorMessages[name] = 'El apellido debe contener al menos 3 caracteres';
            } else {
                errorMessages[name] = '';
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessages[name] = 'Debe ingresar un email válido';
            } else {
                errorMessages[name] = '';
            }
            break;

        case 'password':
            const passErrors = [];
            if (value.length < 6 || value.length > 25) {
                passErrors.push('Debe contener entre 6 y 25 caracteres');
            }
            if (!/[a-z]/.test(value)) {
                passErrors.push('Debe ingresar al menos una letra minúscula');
            }
            if (!/[A-Z]/.test(value)) {
                passErrors.push('Debe ingresar al menos una letra mayúscula');
            }
            if (!/\d/.test(value)) {
                passErrors.push('Debe ingresar al menos un número');
            }
            if (!/[#$%&!?@]/.test(value)) {
                passErrors.push('Debe contener al menos un símbolo (#$%&!?@)');
            }
            if (passErrors.length > 0) {
                errorMessages[name] = passErrors;
            } else {
                errorMessages[name] = '';
            }

            break;

        default:
            break;
    }

    return errorMessages;
};

export default validate;