import React, { useState, useEffect } from 'react';
import Add from '../../components/add/Add'
import axios from 'axios';
import Nav from '../partials/Nav';
import Table from '../../components/table/Table'



export const Admin = () => {
  const [managersData, setData] = useState([]);
  const colNamesA = ['fullName', 'Email', 'Action']

  const getManager = async () => {
    const ManagersRes = await axios.get('http://localhost:5000/admin/getManagers')
    setData(ManagersRes.data)
  }

  useEffect(() => {
    getManager();
  }, [])

  return (
    <div className='flex'>
      <div className='w-1/6'>
        <Nav />
      </div>
      <div className=" bg-neutral-100 w-5/6 h-auto h-auto" >
        <div className='p-20'>
          <Add getManager={getManager} />
          <Table managersData={managersData} getManager={getManager} colNamesA={colNamesA} />
        </div>
      </div>
    </div>
  )
};

export default Admin; 
