import React from 'react';
import { CreateChauffeur } from '../../components/responsable/CreateChauffeur';
import { ListeChauffeur } from '../../components/responsable/ListeChauffeur';

export const Responsable = () => {
    return (
        <div className="flex flex-col px-20 pt-10 bg-gray-100 w-full h-screen">

            <CreateChauffeur />
            <ListeChauffeur />
        </div>

    )
};
