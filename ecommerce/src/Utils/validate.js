const validate = (name, value) => {
    let errorMessages = { name: '', lastName: '', email: '', password: '' };

    switch (name) {
        case 'name':
            if (value.length < 3) {
                errorMessages[name] = 'El nombre debe contener al menos 3 caracteres';
            }
            break;
        case 'lastName':
            if (value.length < 3) {
                errorMessages[name] = 'El apellido debe contener al menos 3 caracteres';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessages[name] = 'Debe ingresar un email válido';
            }
            break;
        case 'password':
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$%&@!?.])[A-Za-z\d#$%&@!?.]{6,25}$/;
            if (!passwordRegex.test(value)) {
                errorMessages[name] = 'La contraseña debe contener entre 6 y 25 caracteres, una minúscula, una mayúscula, un número y uno de los siguientes caracteres especiales (#,$,%,&,@,!,?)';
            }
            break;
        default:
            break;
    }

    return errorMessages;
};

export default validate;