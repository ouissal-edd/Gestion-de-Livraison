
import React from 'react';
import { useCookies } from 'react-cookie';
import RowAdmin from '../row/RowAdmin';
import RowChauffeur from '../row/RowChauffeur';
import RowManager from '../row/RowManager';
import RowResponsable from '../row/RowResponsable';

export const Table = (props) => {
    const [cookies] = useCookies();

    return (

        <div className="mt-2 px-10">

            <table className="w-full ">
                <thead>
                    <tr className="bg-gradient-to-r from-orange-700 to-orange-800">

                        {(cookies.role === "admin") && (
                            <>
                                {props.colNamesA.map((headerItem, index) => (
                                    <th key={index} className="px-16 py-2">
                                        <span className="text-gray-100 font-semibold">{headerItem}</span>
                                    </th>
                                ))}
                            </>

                        )}
                        {(cookies.role === "manager") && (
                            <>
                                {props.colNamesM.map((headerItem, index) => (
                                    <th key={index} className="px-16 py-2">
                                        <span className="text-gray-100 font-semibold">{headerItem}</span>
                                    </th>
                                ))}
                            </>

                        )}

                        {cookies.role === "responsable" && (
                            <>
                                {props.colNamesR.map((headerItem, index) => (
                                    <th key={index} className="px-16 py-2">
                                        <span className="text-gray-100 font-semibold">{headerItem}</span>
                                    </th>
                                ))}
                            </>

                        )}

                        {cookies.role === "chauffeur" && (
                            <>
                                {props.colNamesC.map((headerItem, index) => (
                                    <th key={index} className="px-16 py-2">
                                        <span className="text-gray-100 font-semibold">{headerItem}</span>
                                    </th>
                                ))}
                            </>

                        )}

                    </tr>
                </thead>
                <tbody className="bg-gray-200">

                    {cookies.role === "admin" && (

                        <RowAdmin managersData={props.managersData} getManager={props.getManager} />
                    )}

                    {cookies.role === "manager" && (
                        <RowManager responsablesData={props.responsablesData} getResponsable={props.getResponsable} />
                    )}
                    {cookies.role === "responsable" && (
                        <RowResponsable chauffeurData={props.chauffeurData} getChauffeurs={props.getChauffeurs} />
                    )}
                    {cookies.role === "chauffeur" && (
                        <RowChauffeur />
                    )}

                </tbody>
            </table>
        </div >
    )
};

export default Table;


// import React from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useState, useEffect } from 'react';

// export const Table = ({ managersData, colNamesA, getManager, colNamesR, chauffeurData, getChauffeurs }) => {
//     const [cookies] = useCookies();
//     const [api, setApi] = useState('');
//     const [user, setUser] = useState('');


//     // Delete
//     const drop = async (id) => {
//         if (window.confirm(`sure to delete this ${user} ?`)) {
//             await axios.delete(`${api}/${id}`)
//                 .then(res => getManager())
//                 .then(res => getChauffeurs())
//                 .catch(err => console.log(err))
//         }

//     }

//     // edit
//     const edit = (id, fullName, email) => {
//         setNom(fullName)
//         setEmail(email)
//         setId(id)
//     }

//     useEffect(() => {
//         if (cookies.role === 'manager') {
//             setApi('http://localhost:5000/manager/login');

//         } else if (cookies.role === 'admin') {
//             setApi('http://localhost:5000/admin/deleteManager');
//             setUser('Manager')

//         } else if (cookies.role === 'responsable') {
//             setApi('http://localhost:5000/responsable/createChauffeur');
//             setUser('Chauffeur')

//         } else if (cookies.role === 'chauffeur') {
//             setApi('http://localhost:5000/chauffeur/login');

//         }

//     }, []);


//     return (
//         <div className="mt-2 px-10">
//             <table className="w-full ">
//                 <thead>
//                     <tr className="bg-gradient-to-r from-orange-700 to-orange-800">

//                         {cookies.role === "admin" && (
//                             <>
//                                 {colNamesA.map((headerItem, index) => (
//                                     <th key={index} className="px-16 py-2">
//                                         <span className="text-gray-100 font-semibold">{headerItem}</span>
//                                     </th>
//                                 ))}
//                             </>

//                         )}

//                         {cookies.role === "responsable" && (
//                             <>
//                                 {colNamesR.map((headerItem, index) => (
//                                     <th key={index} className="px-16 py-2">
//                                         <span className="text-gray-100 font-semibold">{headerItem}</span>
//                                     </th>
//                                 ))}
//                             </>

//                         )}

//                     </tr>
//                 </thead>
//                 <tbody className="bg-gray-200">

//                     {cookies.role === "admin" && (
//                         <>
//                             {managersData.map(manager => (

//                                 <tr key={manager._id} className="bg-white border-b-2 border-gray-200">
//                                     <td className="px-16 py-2">
//                                         <span>{manager.fullName}</span>
//                                     </td>
//                                     <td className="px-16 py-2">
//                                         <span>{manager.email}</span>
//                                     </td>
//                                     <td className="px-16 py-2 ">
//                                         <button onClick={() => drop(manager._id)}>
//                                             Delete
//                                         </button>

//                                     </td>
//                                 </tr>
//                             ))}
//                         </>

//                     )}

//                     {cookies.role === "responsable" && (
                        // <>
                        //     {chauffeurData.map(chauffeur => (

                        //         <tr key={chauffeur._id} className="bg-white border-b-2 border-gray-200">
                        //             <td>
                        //                 <span className="text-center ml-2 font-semibold">{chauffeur.chauffeur.fullName}</span>
                        //             </td>

                        //             <td className="px-16 py-2">
                        //                 <span>{chauffeur.chauffeur.email}</span>
                        //             </td>
                        //             <td className="px-16 py-2">
                        //                 <span>{chauffeur.type}</span>
                        //             </td>
                        //             <td className="px-16 py-2">
                        //                 <span>{chauffeur.matricule}</span>
                        //             </td>

                        //             <td className="px-16 py-2 ">
                        //                 <button>
                        //                     Edit
                        //                 </button>

                        //             </td>
                        //         </tr>
                        //     ))}
                        // </>

//                     )}

//                 </tbody>
//             </table>
//         </div >
//     )
// };

// export default Table;
