import React, { useState, useEffect } from 'react';
import Add from '../../components/add/Add'
import axios from 'axios';
import Nav from '../partials/Nav';
import Table from '../../components/table/Table'



export const Manager = () => {
    const [responsablesData, setData] = useState([]);
    const colNamesM = ['fullName', 'Email', 'Action']

    const getResponsable = async () => {
        const Responsables = await axios.get('http://localhost:5000/manager/getResponsables')
        setData(Responsables.data)
    }

    useEffect(() => {
        getResponsable();
    }, [])

    return (
        <div className='flex'>
            <div className='w-1/6'>
                <Nav />
            </div>
            <div className=" bg-neutral-100 w-5/6 h-auto h-auto" >
                <div className='p-20'>
                    <Add getResponsable={getResponsable} />
                    <Table responsablesData={responsablesData} getResponsable={getResponsable} colNamesM={colNamesM} />
                </div>
            </div>
        </div>
    )
};

export default Manager; 
