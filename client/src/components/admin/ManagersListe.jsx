import React ,{useState} from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios';



export const Managers = ({managersData ,getManager}) => {

  
   const renderManagers = () => {
    return     ( 
       managersData.map(manager => (                                      
      <tr  key={manager._id}  className="flex justify-between border-t-2 text-sm font-normal mt-4 space-x-4 text-center">
            <td>{manager.fullName_M} </td>
            <td>{manager.email_M} </td>

        <td className="px-2">
        <button type="submit" className="bg-red-600  text-white  py-2 px-4 rounded mr-3"  onClick={(e)=>drop(manager._id)} > <TiDelete /> </button>
        <button type="submit" className="bg-blue-600  text-white  py-2 px-4 rounded " > <AiFillEdit /> </button>
        </td>
      </tr>    
  ))
  )
  };
  


  

  // const update = (id) =>{
  //   axios.patch(`http://localhost:5000/admin/updateManager/${id}`,{
  //     "fullName_M":fullName_M,
  //     "email_M":email_M,
  //     })
  //     setShow(true);
  //     setHiden(false);
  //     getManager();

  // }

 
    const drop =async (id) =>{
     await axios.delete(`http://localhost:5000/admin/deleteManager/${id}`)
     getManager();

    }

   
  

   
  return (
      <div className="bg-white p-4 rounded-md">
          <div className="mb-4 text-xl font-bold text-gray-700">All Managers</div>
              <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md text-center">
                <div>
                  <span>Full Name</span>
                </div>
                <div>
                  <span>Email</span>
                </div>
                <div>
                  <span>Action</span>
                </div>
              </div>
              
              {renderManagers()}

             </div>


  )
};

export default Managers ;
