import React, { useState } from 'react';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import { TiUserDelete } from 'react-icons/ti';



export const RowManager = ({ responsablesData, getResponsable }) => {
    const [email, setEmail] = useState('');
    const [fullName, setNom] = useState('');
    const [idu, setIdu] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);



    // Delete -------------------------------------------------------
    const drop = async (id) => {
        await axios.delete(`http://localhost:5000/manager/deleteResp/${id}`)
            .then(res => setDeleteModal(false))
            .then(res => getResponsable())


            .catch(err => console.log(err))

    }

    // Update
    const PUT = async (id) => {
        await axios.put(`http://localhost:5000/manager/updateResponsable/${id}`, {
            fullName: fullName,
            email: email,
        })
            .then(res => getResponsable())
            .then(res => setShowModal(false))
            .catch(err => console.log(err))

    }
    return (
        <>
            {
                responsablesData.map(responsable => (
                    <>
                        <tr key={responsable._id} className="bg-white border-b-2 border-gray-200 text-center">

                            <td className="px-16 py-2 text-center">
                                <span> {responsable.fullName}</span>
                            </td>
                            <td className="px-16 py-2 text-center">
                                <span>{responsable.email}</span>
                            </td>
                            <td className="px-16 py-2 text-center ">
                                <button className='p-2' onClick={() => setDeleteModal(true, setIdu(responsable._id))}>
                                    <TiUserDelete />
                                </button>
                                <button className='p-2 ' onClick={() => setShowModal(true, setNom(responsable.fullName), setEmail(responsable.email), setIdu(responsable._id))}>
                                    <AiFillEdit />
                                </button>

                            </td>
                        </tr>

                    </>

                ))
            }








            {/* update Modal */}

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Update responsable
                                    </h3>
                                </div>
                                {/*body*/}

                                <form className='p-10' >
                                    <div className="bg-white shadow rounded-lg p-6">
                                        <div className="grid lg:grid-cols-1 gap-6">

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
                                        </div>
                                    </div>
                                </form>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-orange-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => PUT(idu)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}



            {/* delete Modal */}
            {deleteModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                <div className="relative p-6 flex-auto">
                                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        Sure to delete this responsable ?
                                    </p>
                                </div>

                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setDeleteModal(false)}>
                                        Close
                                    </button>
                                    <button className="bg-orange-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                        onClick={() => drop(idu)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}



        </>
    );
};

export default RowManager;