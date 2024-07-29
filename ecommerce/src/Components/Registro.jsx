import { useState } from 'react';
import validate from '../Utils/validate';



function Registro() {
    const [form, setForm] = useState({ name: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        // validateForm();
        console.log(form);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        setForm({ ...form, [name]: value });
        const fieldErrors = validate(name, value);
        console.log('Errores del campo:', fieldErrors);
        console.log('Estado - errors:', errors);
        console.log({ ...errors, ...fieldErrors });
        setErrors(prev => ({ ...prev, ...fieldErrors }));
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type='text' name='name' value={form.name} onChange={handleChange} ></input>
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <label>Apellido</label>
                    <input type='text' name='lastName' value={form.lastName} onChange={handleChange} ></input>
                    {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                </div>
                <div>
                    <label>email</label>
                    <input type='email' name='email' value={form.email} onChange={handleChange} ></input>
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={form.password} onChange={handleChange} ></input>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
                <button type='submit'>Registrar</button>
            </form >
        </div >
    );
}

export default Registro;