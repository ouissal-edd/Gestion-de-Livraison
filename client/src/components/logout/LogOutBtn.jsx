import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export const LogOutBtn = () => {
  const [cookies] = useCookies();
  const { getLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate();

  const logOut = async () => {
    await axios.get('http://localhost:5000/admin/logout')
    await getLoggedIn();
    navigate(`/${cookies.role}/login`);



  };

  return <button onClick={logOut}>LogOut</button>;
};
export default LogOutBtn;
