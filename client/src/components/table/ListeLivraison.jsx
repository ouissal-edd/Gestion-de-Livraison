import React from 'react';


export const ListeLivraison = ({ livraisonData, getLivraisons }) => {

    return (
        <div className="mt-2 px-10 ">
            <table className="w-full ">
                <thead>
                    <tr className="bg-gradient-to-r from-orange-700 to-orange-800">
                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Product </span>
                        </th>
                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Poid</span>
                        </th>

                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Depart</span>
                        </th>
                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Arriver</span>
                        </th>
                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Zone</span>
                        </th>

                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Date</span>
                        </th>

                        <th className="px-1 py-2">
                            <span className="text-gray-100 font-semibold">Status</span>
                        </th>

                    </tr>
                </thead>
                <tbody className="bg-gray-200">


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
                            <td className=" text-center px-1 py-2">
                                <span>{livraison.date}</span>
                            </td>
                            <td className=" text-center px-1 py-2">
                                <span>{livraison.status}</span>
                            </td>


                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
};

export default ListeLivraison;
