import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const Prime = () => {
    const [showPrime, setShowPrime] = React.useState(false);
    const [prime, setPrime] = useState('');



    let today = new Date();
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const date = lastDayOfMonth.toLocaleString()
    console.log(lastDayOfMonth.toLocaleString());
    let duree = lastDayOfMonth.getTime() - today.getTime();
    console.log(duree);

    const miseEnAttente = () => {
        setTimeout(Prime, duree);
    }

    const Prime = async () => {
        setShowPrime(true)
        await axios.post('http://localhost:5000/chauffeur/calculePrime')
            .then((res) => setPrime(res.data.prime))

    }
    useEffect(() => {
        miseEnAttente()
    }, [])
    return (


        <div className=" mt-2 px-10 bg-neutral-100 text-center py-4 lg:px-4">
            <div className="p-2 bg-orange-700 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <button onClick={() => miseEnAttente()} className="flex rounded-full bg-orange-900 uppercase px-2 py-1 text-xs font-bold mr-3">Check</button>
                <span className="font-semibold mr-2 text-left flex-auto">You can check your prime in this date {date}</span>
                <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
            </div>
            {
                showPrime ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*body*/}

                                    <form className='p-10' >
                                        <div className="bg-white shadow rounded-lg p-6">
                                            <p> {prime} DH</p>
                                        </div>
                                    </form>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowPrime(false)}>
                                            Close
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}

        </div>

    );
};
export default Prime;