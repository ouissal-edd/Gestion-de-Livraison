import React, { useState } from 'react';
import axios from 'axios';


export const CreateLivraison = ({ getLivraisons }) => {

    const [fullName, setNom] = useState('');
    const [type, setType] = useState('');
    const [poid, setPoid] = useState('');
    const [depart, setDepart] = useState('');
    const [arrive, setArrive] = useState('');
    const [zone, setZone] = useState('');

    const addLivraison = async (e) => {
        e.preventDefault();
        const livraisonData = {
            'name': fullName,
            'type': type,
            'poid': poid,
            'depart': depart,
            'arrive': arrive,
            'zone': zone

        };
        await axios.post('http://localhost:5000/responsable/createLivraison', livraisonData)

    }


    // useEffect(() => {
    //     getLivraisons()
    // })


    return (
        <>
            <form onSubmit={addLivraison} className='px-10'>
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="name" className="bg-white text-gray-600 px-1">Name</label>
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
                                    <label htmlFor="arrive" className="bg-white text-gray-600 px-1">Arriver</label>
                                </p>
                            </div>
                            <p>
                                <input id="arrive" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 outline-none block h-full w-full"
                                    onChange={(e) => setArrive(e.target.value)}
                                    placeholder="ville d'arriver"
                                    value={arrive}

                                />
                            </p>
                        </div>
                        <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="depart" className="bg-white text-gray-600 px-1"> Depart</label>
                                </p>
                            </div>
                            <p>
                                <input id="depart" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 outline-none block h-full w-full"
                                    onChange={(e) => setDepart(e.target.value)}
                                    placeholder=" ville depart"
                                    value={depart}

                                />
                            </p>
                        </div>
                        <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="poid" className="bg-white text-gray-600 px-1">Poid</label>
                                </p>
                            </div>
                            <p>
                                <input id="poid" autoComplete="false" tabIndex="0" type="number" className="py-1 px-1 outline-none block h-full w-full"
                                    onChange={(e) => setPoid(e.target.value)}
                                    placeholder="Kg"
                                    value={poid}
                                    required
                                />
                            </p>
                        </div>


                        <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="zone" className="bg-white text-gray-600 px-1">Zone</label>
                                </p>
                            </div>
                            <p>
                                <input id="zone" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 outline-none block h-full w-full"
                                    onChange={(e) => setZone(e.target.value)}
                                    placeholder="Contry"
                                    value={zone}

                                />
                            </p>
                        </div>


                        <div className="border focus-within:border-orange-600 focus-within:text-orange-600 transition-all duration-600 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="type" className="bg-white text-gray-600 px-1">Type</label>
                                </p>
                            </div>
                            <p>
                                <select id="type" autoComplete="false" tabIndex="0" type="text" className="py-1 px-1 outline-none block h-full w-full"
                                    onChange={(e) => setType(e.target.value)}
                                    value={type}
                                >
                                    <option>nationale</option>
                                    <option>internationale</option>

                                </select>
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


        </>
    )
};

export default CreateLivraison;
