'use client'
import React, { useState } from 'react';



export default function TableModifications(modifications: any) {
    
    const [brandFilter, setBrandFilter] = useState('');
    const [modelFilter, setModelFilter] = useState('');
    const [modificationFilter, setModificationFilter] = useState('');

    const [sortBy, setSortBy] = useState(null); // 'horsePower', 'weight' или null
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' или 'desc'
  

     const handleBrandFilterChange = (e) => setBrandFilter(e.target.value);
     const handleModelFilterChange = (e) => setModelFilter(e.target.value);
     const handleModificationFilterChange = (e) => setModificationFilter(e.target.value);


  let  filteredModifications = modifications.modifications.filter(mod =>
    mod.name.toLowerCase().includes(modificationFilter.toLowerCase()) &&
    mod.model_name.toLowerCase().includes(modelFilter.toLowerCase()) &&
    mod.brand_name.toLowerCase().includes(brandFilter.toLowerCase())
  );    


    // Функции за сортиране
    const handleSortByHorsePower = () => {
        setSortBy('horsePower');
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      };
    
      const handleSortByWeight = () => {
        setSortBy('weight');
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      };

      
   // Сортиране на модификациите
   filteredModifications = [...filteredModifications].sort((a, b) => {
    if (sortBy === null) return 0;
    
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

    
  console.log(filteredModifications);

    return (
        <div className="lg:w-3/4 relative overflow-x-auto shadow-md sm:rounded-lg  bg-gray-50 py-2 px-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-base text-gray-700 uppercase    dark:text-gray-400 ">
                    <tr>
                        <th className="pr-6 py-2"><p>Brands</p></th>
                        <th className="pr-6 py-2"><p>Models</p></th>
                        <th className="pr-6 py-2"><p>Modifications</p></th>
                        <th className="pr-6 py-2"><p>Horse Power</p></th>
                        <th className="pr-6 py-2"><p>Weight</p></th>
                    </tr>
                    <tr>
                        <th className="pr-6 py-1">
                            <input value={brandFilter} onChange={handleBrandFilterChange} type="text" placeholder='Brand' className="w-full border border-gray-400 rounded-md p-1 px-2 select-none" />
                        </th>
                        <th className="pr-6 py-1">
                            <input value={modelFilter} onChange={handleModelFilterChange} type="text" placeholder='Models' className="w-full border border-gray-400 rounded-md p-1 px-2 select-none" />
                        </th>
                        <th className="pr-6 py-1">
                            <input value={modificationFilter} onChange={handleModificationFilterChange} type="text" placeholder='Modifications' className="w-full border border-gray-400 rounded-md p-1 px-2 select-none" />
                        </th>
                        <th className="pr-6 py-1">
                            <button onClick={handleSortByHorsePower}>
                                ({sortBy === 'horsePower' ? (sortOrder === 'asc' ? '↑' : '↓') : ''})
                            </button>
                        </th>
                        <th className="pr-6 py-1">
                            <button onClick={handleSortByWeight}>
                                ({sortBy === 'weight' ? (sortOrder === 'asc' ? '↑' : '↓') : ''})
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredModifications?.map((modification) => (
                        <tr key={modification.id} className="odd:bg-white  even:bg-gray-50  border-b  dark:border-gray-700">
                            <td className="py-2 px-1">{modification.brand_name}</td>
                            <td className="py-2 px-1">{modification.model_name}</td>
                            <td className="py-2 px-1">{modification.name}</td>
                            <td className="py-2 px-1">{modification.horsePower}</td>
                            <td className="py-2 px-1">{modification.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

