import React, { useState } from 'react';
import axios from 'axios';
import { TiUserDelete } from 'react-icons/ti';



export const RowResponsable = ({ chauffeurData, getChauffeurs }) => {
    const [email, setEmail] = useState('');
    const [fullName, setNom] = useState('');
    const [idu, setIdu] = useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);



    // Delete -------------------------------------------------------
    const drop = async (id) => {

        await axios.delete(`http://localhost:5000/responsable/deleteChauffeur/${id}`)
            .then(res2 => (getChauffeurs()))
            .then(res2 => (setDeleteModal(false)))

            .catch(err => (console.log(err)))

    }


    return (
        <>
            <>
                {chauffeurData.map(chauffeur => (

                    <tr key={chauffeur._id} className="bg-white border-b-2 border-gray-200">
                        <td>
                            <span className="text-center ml-2 font-semibold">{chauffeur.fullName}</span>
                        </td>

                        <td className="px-16 py-2 text-center">
                            <span>{chauffeur.email}</span>
                        </td>

                        <td className="px-16 py-2 text-center ">
                            <button className='p-2' onClick={() => setDeleteModal(true, setIdu(chauffeur._id))}>
                                <TiUserDelete />
                            </button>

                        </td>
                    </tr>
                ))}
            </>





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

export default RowResponsable;