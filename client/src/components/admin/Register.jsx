import {React , useState } from 'react';
import axios from 'axios';

export const Register = () => {

    const [fullName, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passVerify, setVerify] = useState('');

  
    
     const register = async(e) => {
         e.preventDefault();
         try {
             const adminData = {
                 'fullName':fullName,
                 'email':email,
                 'password':pass,
                 'passwordVerify':passVerify
             };
             await axios.post('http://localhost:5000/admin/register',adminData );
         } catch (err) {
             console.error(err);
         }
     
    };
    
    


  return (
    <form onSubmit={register} className="w-full max-w-sm">
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          Full Name
        </label>
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Ouissal eddouj'
        onChange={(e) => setNom(e.target.value)}
        value={fullName}
        />
      </div>
    </div>
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-email">
          Email
        </label>
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-email" type="email" placeholder="exemple@gmail.com" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
    </div>

    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
          Password
        </label>
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
      </div>
    </div>
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-passwordv">
          Password Verify
        </label>
      </div>
      <div className="md:w-2/3">
        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-passwordv" type="password" placeholder="repeat password ***"
          onChange={(e) => setVerify(e.target.value)}
          value={passVerify}
        />
      </div>
    </div>
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3"></div>
      <label className="md:w-2/3 block text-gray-500 font-bold">
        <input className="mr-2 leading-tight" type="checkbox" />
        <span className="text-sm">
          Send me your newsletter!
        </span>
      </label>
    </div>
    <div className="md:flex md:items-center">
      <div className="md:w-1/3"></div>
      <div className="md:w-2/3">
        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
          Sign Up
        </button>
      </div>
    </div>
  </form>
  )
};

export default Register;
