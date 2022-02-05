import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GiStorkDelivery } from 'react-icons/gi';




export const RowChauffeur = () => {

    const [livraisonData, setData] = useState([]);
    const [reflivraison, setIdu] = useState('');
    const [showModal, setShowModal] = React.useState(false);



    const getLivraisons = async () => {
        await axios.get('http://localhost:5000/chauffeur/getLivraison')
            .then((res) => setData(res.data.data))
    }




    useEffect(() => {
        getLivraisons();
    }, [])


    // tAKE DELIVERY
    const TakeDelivery = async () => {
        await axios.post(`http://localhost:5000/chauffeur/takeDelivery`, {
            ref_livraison: reflivraison,
        })
            .then(res => getLivraisons())
            .then(res => setShowModal(false))
            .catch(err => console.log(err))
    }
    return (
        <>




            {livraisonData.map(livraison => (

                <tr key={livraison._id} className="bg-white border-b-2 border-gray-200">
                    <td>
                        <span className="text-center ml-2 font-semibold">{livraison.name}</span>
                    </td>

                    <td className=" text-center px-1 py-2">
                        <span>{livraison.poid} Kg</span>
                    </td>
                    <td className=" text-center px-1 py-2">
                        <span>{livraison.depart} </span>
                    </td>
                    <td className=" text-center px-1 py-2">
                        <span> {livraison.arrive}</span>
                    </td>
                    <td className=" text-center px-1 py-2">
                        <span>{livraison.zone} / {livraison.type} </span>
                    </td>

                    <td className="px-16 py-2 text-center ">

                        <button className='p-2 ' onClick={() => setShowModal(true, setIdu(livraison._id))}>
                            <GiStorkDelivery />
                        </button>

                    </td>


                </tr>
            ))}







            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*body*/}

                                <form className='p-10' >
                                    <div className="bg-white shadow rounded-lg p-6">
                                        <p>Take this delivery?</p>
                                    </div>
                                </form>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="bg-orange-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => TakeDelivery(reflivraison)}
                                    >
                                        Yes
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

export default RowChauffeur;