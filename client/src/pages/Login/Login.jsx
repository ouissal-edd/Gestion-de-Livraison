import React from 'react';
import Auth from '../../components/Auth/Auth';

const Login = ({ role }) => {
    return (<div>
        <Auth role={role} />
    </div>);
};

export default Login;
