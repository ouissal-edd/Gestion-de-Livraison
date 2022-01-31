import React , {useState,useEffect} from 'react';
import ManagersList from '../../components/admin/ManagersListe'
import ManagerForm from '../../components/admin/ManagerForm'
import axios from 'axios';


export const Admin = () => {
  const [managersData,setData] = useState([]);
  const getManager = async() =>{
    const ManagersRes=await axios.get('http://localhost:5000/admin/getManagers')
    setData(ManagersRes.data)
}

  useEffect(() => {
  getManager();
},[])

  return (
    <div className="flex flex-wrap bg-gray-100 w-full h-screen">
      <div className="w-9/12">
        <div className="p-4 text-gray-500">
        < ManagerForm  getManager={getManager} />
        <ManagersList managersData={managersData} getManager={getManager} />
        </div>
    </div>
    </div>

  )
};

export default Admin ; 
