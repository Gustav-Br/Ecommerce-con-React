import { useState } from 'react';


function Registro() {
    const [form, setForm] = useState({ name: '', lastName: '', email: '', password: '' });
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name);
        setForm({ ...form, [name]: value })
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type='text' name='name' value={form.name} onChange={handleChange} ></input>
                </div>
                <div>
                    <label>Apellido</label>
                    <input type='text' name='lastName' value={form.lastName} onChange={handleChange} ></input>
                </div>
                <div>
                    <label>email</label>
                    <input type='email' name='email' value={form.email} onChange={handleChange} ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={form.password} onChange={handleChange} ></input>
                </div>
            </form >
        </div >
    );
}

export default Registro;