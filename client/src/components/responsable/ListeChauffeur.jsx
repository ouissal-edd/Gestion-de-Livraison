import React from 'react';

export const ListeChauffeur = () => {
    return (
        <div className="mt-2">
            <table className="w-full">
                <thead>
                    <tr className="bg-gradient-to-r from-orange-700 to-orange-800">
                        <th className="px-16 py-2">
                            <span className="text-gray-100 font-semibold">Name</span>
                        </th>
                        <th className="px-16 py-2">
                            <span className="text-gray-100 font-semibold">Email</span>
                        </th>

                        <th className="px-16 py-2">
                            <span className="text-gray-100 font-semibold">Role</span>
                        </th>

                        <th className="px-16 py-2">
                            <span className="text-gray-100 font-semibold">Date</span>
                        </th>

                        <th className="px-16 py-2">
                            <span className="text-gray-100 font-semibold">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    <tr className="bg-white border-b-2 border-gray-200">
                        <td>
                            <span className="text-center ml-2 font-semibold">John Doe</span>
                        </td>

                        <td className="px-16 py-2">
                            <span>john doe</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>admin</span>
                        </td>
                        <td className="px-16 py-2">
                            <span>05/06/2020</span>
                        </td>

                        <td className="px-16 py-2">
                            <select name="" id="">
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};
