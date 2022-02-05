import React, { useState, useEffect } from 'react';
import { Add } from '../../components/add/Add';
import axios from 'axios';
import Table from '../../components/table/Table'
import Nav from '../partials/Nav';



export const Responsable = () => {

    const [chauffeurData, setData] = useState([]);
    const colNamesR = ['fullName', 'Email', 'Action']
    const getChauffeurs = async () => {
        await axios.get('http://localhost:5000/responsable/getChauffeurs')
            .then((res) => setData(res.data))
    }

    useEffect(() => {
        getChauffeurs();
    }, [])

    return (
        <div className='flex'>
            <div className='w-1/6 '>
                <Nav />
            </div>
            <div className=" bg-neutral-100 w-5/6 h-auto" >
                <div className='p-20'>
                    <Add getChauffeurs={getChauffeurs} />
                    <Table chauffeurData={chauffeurData} getChauffeurs={getChauffeurs} colNamesR={colNamesR} />
                </div>
            </div>
        </div>

    )
};
