import React, { useState, useEffect } from 'react';
import { CreateLivraison } from '../../components/add/CreateLivraison';
import { ListeLivraison } from '../../components/table/ListeLivraison'
import Nav from '../partials/Nav';
import axios from 'axios';



export const LivraisonRes = () => {

    const [livraisonData, setData] = useState([]);

    const getLivraisons = async () => {
        await axios.get('http://localhost:5000/responsable/getLivraison')
            .then((res) => setData(res.data.data))
    }

    useEffect(() => {
        getLivraisons();
    }, [])

    return (


        <div className='flex'>
            <div className='w-1/6 '>
                <Nav />
            </div>
            <div className=" bg-neutral-100 w-5/6 h-auto" >
                <div className='p-20'>
                    <CreateLivraison getLivraisons={getLivraisons} />
                    <ListeLivraison livraisonData={livraisonData} getLivraisons={getLivraisons} />
                </div>
            </div>
        </div>



    )
};
export default LivraisonRes;
