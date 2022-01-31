import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LogOutBtn = () => {
  const {getLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate();

     const logOut = async() => {
         await axios.get('http://localhost:5000/admin/logout')
         await getLoggedIn();
         navigate('admin/login');


          
    };
    
  return <button onClick={logOut}>LogOut</button>;
};
export default LogOutBtn ;
