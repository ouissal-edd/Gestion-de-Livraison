
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';



export const Add = ({ getResponsable, getManager, getChauffeurs }) => {
    const [cookies] = useCookies();
    const [fullName, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passVerify, setVerify] = useState('');

    const [permis, setPermis] = useState('');
    const [matricule, setMatricule] = useState('');

    const api = 'http://localhost:5000/'

    const data = {
        'fullName': fullName,
        'email': email,
        'password': pass,
        'passwordVerify': passVerify,
        'type': permis,
        'matricule': matricule
    };

    const addUser = async (e) => {
        e.preventDefault();

        try {

            const role = cookies.role;
            switch (role) {
                case 'manager':
                    await axios.post(`${api}manager/createResponsable`, data)
                        .then(res => (getResponsable()))
                        .catch(err => console.log(err))
                    break;
                case 'admin':
                    await axios.post(`${api}admin/createManager`, data)
                    getManager();
                    break;
                case 'responsable':
                    await axios.post(`${api}responsable/createChauffeur`, data)
                    getChauffeurs();
                    break;


                default:
                    console.log(`Sorry, ${role} undefined`);
            }

        } catch (err) {
            console.error(err)
        }

    }




    return (
        <form onSubmit={addUser} className='px-10'>
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid lg:grid-cols-3 gap-6">


                    {cookies.role === "admin" && (
                        <>
                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="name" className="bg-white text-gray-600 px-1">Full Name *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="name" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                                        onChange={(e) => setNom(e.target.value)}
                                        placeholder="FullName"
                                        value={fullName}
                                        required
                                    />
                                </p>
                            </div>



                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="email" className="bg-white text-gray-600 px-1">Email *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="email" autoComplete="false" tabIndex="0" type="email" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        value={email}
                                        required
                                    />
                                </p>
                            </div>
                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="password" className="bg-white text-gray-600 px-1">Password *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="password" autoComplete="false" tabIndex="0" type="password" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="password"
                                        value={pass}

                                    />
                                </p>
                            </div>
                        </>

                    )}

                    {cookies.role === "manager" && (
                        <>
                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="name" className="bg-white text-gray-600 px-1">Full Name *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="name" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                                        onChange={(e) => setNom(e.target.value)}
                                        placeholder="FullName"
                                        value={fullName}
                                        required
                                    />
                                </p>
                            </div>



                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="email" className="bg-white text-gray-600 px-1">Email *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="email" autoComplete="false" tabIndex="0" type="email" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        value={email}
                                        required
                                    />
                                </p>
                            </div>
                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="password" className="bg-white text-gray-600 px-1">Password *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="password" autoComplete="false" tabIndex="0" type="password" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="password"
                                        value={pass}

                                    />
                                </p>
                            </div>
                        </>

                    )}

                    {cookies.role === "responsable" && (
                        <>

                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="name" className="bg-white text-gray-600 px-1">Full Name *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="name" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                                        onChange={(e) => setNom(e.target.value)}
                                        placeholder="FullName"
                                        value={fullName}
                                        required
                                    />
                                </p>
                            </div>



                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="email" className="bg-white text-gray-600 px-1">Email *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="email" autoComplete="false" tabIndex="0" type="email" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        value={email}
                                        required
                                    />
                                </p>
                            </div>
                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="password" className="bg-white text-gray-600 px-1">Password *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="password" autoComplete="false" tabIndex="0" type="password" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setPass(e.target.value)}
                                        placeholder="password"
                                        value={pass}

                                    />
                                </p>
                            </div>

                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="username" className="bg-white text-gray-600 px-1">Permis *</label>
                                    </p>
                                </div>
                                <p>
                                    <select id="permis" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setPermis(e.target.value)}
                                        placeholder="password"
                                        value={permis}
                                    >
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>Avion</option>


                                    </select>
                                </p>
                            </div>
                            <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="matricule" className="bg-white text-gray-600 px-1">Matricule *</label>
                                    </p>
                                </div>
                                <p>
                                    <input id="matricule" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 outline-none block h-full w-full"
                                        onChange={(e) => setMatricule(e.target.value)}
                                        placeholder="Matricule"
                                        value={matricule}

                                    />
                                </p>
                            </div>
                        </>

                    )}

                    <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                        <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                            <p>
                                <label htmlFor="passwordv" className="bg-white text-gray-600 px-1">Password Verify*</label>
                            </p>
                        </div>
                        <p>
                            <input id="passwordv" autoComplete="false" tabIndex="0" type="password" className="py-1 px-1 outline-none block h-full w-full"
                                onChange={(e) => setVerify(e.target.value)}
                                placeholder="password"
                                value={passVerify}

                            />
                        </p>
                    </div>

                </div>
                <div className="border-t mt-6 pt-3">
                    <button className="rounded text-gray-100 px-3 py-1 bg-orange-600 hover:shadow-inner hover:bg-orange-700 transition-all duration-300">
                        Save
                    </button>

                </div>
            </div>
        </form>




    )
};

export default Add;
