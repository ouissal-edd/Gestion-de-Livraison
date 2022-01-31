import { React, useState, useContext } from 'react';
import axios from 'axios';
import pic from '../../assets/images/login.png'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export const LoginRes = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const ResponsableData = {
                'email_R': email,
                'password_R': pass,
            };
            await axios.post('http://localhost:5000/responsable/login', ResponsableData);
            await getLoggedIn();
            navigate('/responsable/dashboard');

        } catch (err) {
            console.error(err);
        }

    };

    return (
        <form onSubmit={login}>
            <div class="w-full h-screen flex">
                <img src={pic} />
                <div class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg">
                    <h1 class="text-3xl font-bold text-orange-500 mb-2">LOGIN</h1>
                    <div class="w-1/2 text-center">

                        <input type="email" name="username" placeholder="email" autocomplete="off"
                            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <input type="password" name="password" placeholder="password" autocomplete="off"
                            class="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"

                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                        />

                        <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-lg focus:outline-none shadow">Sign In</button>
                    </div>
                </div>
            </div>
        </form>
    )
};
