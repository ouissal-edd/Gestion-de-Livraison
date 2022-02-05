import React from 'react';
import Nav from '../partials/Nav';
import Table from '../../components/table/Table'
import { Prime } from '../../components/prime/Prime';



export const Chauffeur = () => {
    const colNamesC = ["Product", "poid", "depart", "arriver", "zone", "Action"]
    return (
        <div className='flex'>
            <div className='w-1/6'>
                <Nav />
            </div>
            <div className=" bg-neutral-100 w-5/6 h-auto h-auto" >
                <div className='p-20'>
                    <Prime />
                    <Table colNamesC={colNamesC} />
                </div>
            </div>
        </div>
    )
};

export default Chauffeur; 
