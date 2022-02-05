import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import pic from '../../assets/images/login.png';
import '../../style/Login.css'


const Auth = ({ role }) => {
    const [api, setApi] = useState('');
    const [cookies, setCookie] = useCookies();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { getLoggedIn } = useContext(AuthContext)


    const login = async (e) => {
        e.preventDefault()
        await axios.post(api, {
            "email": email,
            "password": password
        })
        await getLoggedIn()
        navigate(`/${cookies.role}`)


    }

    useEffect(() => {
        if (role === 'manager') {
            setApi('http://localhost:5000/manager/login');
            setCookie('role', 'manager');

        } else if (role === 'admin') {
            setApi('http://localhost:5000/admin/login');
            setCookie('role', 'admin');

        } else if (role === 'responsable') {
            setApi('http://localhost:5000/responsable/login');
            setCookie('role', 'responsable');

        } else if (role === 'chauffeur') {
            setApi('http://localhost:5000/chauffeur/login');
            setCookie('role', 'chauffeur');

        }

    }, []);

    return (
        <form onSubmit={login}>
            <div className="w-full h-screen flex">
                <div className='w-6/12'>
                    <img className='pic' src={pic} alt='#' />
                </div>
                <div className="bg-white flex flex-col justify-center items-center w-6/12 shadow-lg">
                    <h1 className="text-3xl font-bold text-orange-500 mb-2">LOGIN</h1>
                    <div className="w-1/2 text-center">

                        <input type="email" name="username" placeholder="email" autoComplete="off"
                            className="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <input type="password" name="password" placeholder="password" autoComplete="off"
                            className="shadow-md border w-full h-10 px-3 py-2 text-orange-500 focus:outline-none focus:border-orange-500 mb-3 rounded"

                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-lg focus:outline-none shadow">Sign In</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Auth;
