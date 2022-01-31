import React from 'react';
import Routers from './router/Routers';
import axios from 'axios';
import { AuthContextProvider } from './context/AuthContext';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <AuthContextProvider>
      <Routers />
      </AuthContextProvider>
    </div>
  );
}

export default App;
