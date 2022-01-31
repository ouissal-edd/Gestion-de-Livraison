import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { CgProfile } from "react-icons/cg";
import AuthContext from '../../context/AuthContext';
import LogOutBtn from '../../components/admin/LogOutBtn'

export const Nav = () => {
    const { loggedIn } = useContext(AuthContext)
    return (
        <nav className=" bg-ehe-900 w-[14em] z-10  h-screen items-center fixed justify-between py-5 dark:bg-gray-800 mr-3">
            <div className="flex flex-col flex-wrap justify-between items-center mx-auto">
                <div className="flex items-center space-x-4 p-2 mb-5">
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">MarocShip</h4>
                    </div>
                </div>
                <ul className="flex-col">
                    {loggedIn === true && (
                        <>
                            <li>
                                <Link to="/dash" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                    <CgProfile />
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/register" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                    <CgProfile />
                                    <span>My profile</span>
                                </Link>
                            </li>

                            <li>
                                <div className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                    <CgProfile />
                                    <LogOutBtn />
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200  focus:shadow-outline">
                                    <CgProfile />
                                    <span>Responsable</span>

                                </div>
                            </li>
                        </>
                    )}

                    {loggedIn === false && (
                        <li>
                            <Link to="/login" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                                <span className="text-gray-600">
                                    <CgProfile />
                                </span>
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

        </nav>


    )
};

export default Nav;
