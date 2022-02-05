import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from '../pages/admin/Admin';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Responsable } from '../pages/responsable/Responsable';
import { LivraisonRes } from '../pages/responsable/LivraisonRes';
import Login from '../pages/Login/Login';
import { useCookies } from "react-cookie";
import Manager from '../pages/manager/Manager';
import Chauffeur from '../pages/chauffeur/Chauffeur';


;



const Routers = () => {
    const { loggedIn } = useContext(AuthContext)
    const [cookies] = useCookies();
    console.log(cookies.role)




    return (
        <>
            <BrowserRouter>
                {loggedIn === false && (
                    <Routes>
                        <Route path="manager/login" element={<Login role="manager" />}></Route>
                        <Route path="admin/login" element={<Login role="admin" />}></Route>
                        <Route path="chauffeur/login" element={<Login role="chauffeur" />}></Route>
                        <Route path="responsable/login" element={<Login role="responsable" />}></Route>
                    </Routes>


                )}

                {loggedIn === true && (
                    <>
                        {cookies.role === "admin" && (
                            <>
                                < Routes >
                                    <Route path="/admin" element={<Admin />} />
                                </Routes>
                            </>
                        )}
                        {cookies.role === "responsable" && (
                            < Routes >
                                <Route path="/responsable" element={<Responsable />} />
                                <Route path="/responsable/livraison" element={<LivraisonRes />} />
                            </Routes>

                        )}
                        {cookies.role === "manager" && (
                            <>
                                < Routes >
                                    <Route path="/manager" element={<Manager />} />
                                </Routes>
                            </>
                        )}

                        {cookies.role === "chauffeur" && (
                            <>
                                < Routes >
                                    <Route path="/chauffeur" element={<Chauffeur />} />
                                </Routes>
                            </>
                        )}
                    </>



                )
                }

            </BrowserRouter>

        </>
    );
};

export default Routers;
