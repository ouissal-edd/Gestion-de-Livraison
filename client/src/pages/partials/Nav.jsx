import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { DiGoogleAnalytics } from "react-icons/di";
import { GrDeliver } from "react-icons/gr";
import AuthContext from '../../context/AuthContext';
import LogOutBtn from '../../components/logout/LogOutBtn'
import { useCookies } from "react-cookie";

export const Nav = () => {
    const { loggedIn } = useContext(AuthContext)
    const [cookies] = useCookies();
    console.log(cookies.role)
    return (
        <nav className=" bg-white   h-screen items-center fixed justify-center p-5 ">
            <div className="flex flex-col flex-wrap justify-between items-center mx-auto">
                <div className="flex items-center space-x-4 p-2 mb-5">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">MarocShip</h4>
                    </div>
                </div>
                <ul className="flex-col">
                    {loggedIn === true && (
                        <>
                            {cookies.role === "admin" && (
                                <>
                                    <li>
                                        <Link to="/admin" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                            <MdSpaceDashboard />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                            <DiGoogleAnalytics />
                                            <span>Analytics</span>
                                        </Link>
                                    </li>


                                </>
                            )}
                            {cookies.role === "responsable" && (
                                <>
                                    <li>
                                        <Link to="/responsable" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                            <MdSpaceDashboard />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/responsable/livraison" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                            <GrDeliver />
                                            <span>Livraison</span>
                                        </Link>
                                    </li>

                                </>
                            )}
                            {cookies.role === "manager" && (
                                <>
                                    <li>
                                        <Link to="/responsable" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                            <MdSpaceDashboard />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                </>
                            )}


                            <li>
                                <div className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                    <AiOutlineLogout />
                                    <LogOutBtn />
                                </div>
                            </li>
                        </>

                    )}

                </ul>
            </div>

        </nav>


    )
};

export default Nav;
