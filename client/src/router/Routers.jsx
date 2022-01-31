import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registerp from '../pages/admin/Register';
import Admin from '../pages/admin/Admin';
import Login from '../pages/admin/Login';
import Nav from '../pages/partials/Nav';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LoginRes } from '../components/responsable/LoginRes';
import { Responsable } from '../pages/responsable/Responsable';
;



const Routers = () => {
    const { loggedIn } = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Nav />

            <div className="pl-[18em]   dark:bg-slate-900 bg-white dark:text-white min-h-screen ">
                <Routes>
                    {loggedIn === false && (
                        <>
                            <Route path="admin/login" element={<Login />} />
                            <Route path="responsable/login" element={<LoginRes />} />
                        </>

                    )}
                    {loggedIn === true && (
                        <>
                            <Route path="/dash" element={<Admin />} />
                            <Route path="/responsable/dashboard" element={<Responsable />} />
                            <Route path="/register" element={<Registerp />} />
                        </>
                    )}

                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Routers;
