import { useState } from 'react';
import firebase from '../Config/firebase';


function Login() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const responseUser = await firebase.auth().signInWithEmailAndPassword(form.email, form.password);
            if (responseUser.user.uid) {
                console.log(responseUser.user.uid, "Loguin exitoso");
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email</label>
                    <input type='email' name='email' value={form.email} onChange={handleChange} ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name='password' value={form.password} onChange={handleChange} ></input>
                </div>
                <button type='submit'>Ingresar</button>
            </form >
        </div >
    );
}

export default Login;