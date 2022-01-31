
import axios from 'axios';
import React, { useState } from 'react';


export const ManagerForm = ({ getManager }) => {

  const [fullName, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passVerify, setVerify] = useState('');


  const addManager = async (e) => {
    e.preventDefault();

    try {
      const ManagerData = {
        'fullName_M': fullName,
        'email_M': email,
        'password_M': pass,
        'passwordVerify_M': passVerify,
      };

      await axios.post('http://localhost:5000/admin/createManager', ManagerData)
      getManager();

    } catch (err) {
      console.error(err)
    }

  }
  return (

    <form onSubmit={addManager} className=" w-full grid grid-cols-1 gap-4 place-content-center h-48">
      <div className="flex flex-wrap  ml-4">
        <div className="w-full md:w-1/4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            FullName
          </label>
          <input
            onChange={(e) => setNom(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="FullName"
            value={fullName}
            required
          />
        </div>

        <div className="w-full md:w-1/4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="email"
            placeholder="Email"
            value={email}
            required
          />
        </div>
        <div className="w-full md:w-1/4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password
          </label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            placeholder="password"
            value={pass}

            required
          />
        </div>
        <div className="w-full md:w-1/4 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password verify
          </label>
          <input
            onChange={(e) => setVerify(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            placeholder="pass verify"
            value={passVerify}
            required
          />
        </div>
        <div className="w-full md:w-1/4 px-3 mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-20 rounded " type='submit' >
            add
          </button>
        </div>
      </div>
    </form>
  )
};

export default ManagerForm;
