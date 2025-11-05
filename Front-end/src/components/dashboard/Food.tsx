import { useState } from 'react';
import images from '../../assets/milkrice01.png'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoMdAdd } from "react-icons/io";
import FoodForm from "../dashboard/FoodForm"


export  default function Foods(){

    const [foods,setFoods] =useState([
        {name:'Milk rice', catogory:'Srilankan', images:images}
    ])
    const [showForm,setShowForm] = useState(false)

    const handleAddFood = (newFood:any) =>{
        setFoods([...foods, newFood])
    }
    return(
        <>
        <div className="text-center text-gray-300 py-10">
            <div className='flex justify-end mb-4'>
                <button className='flex items-center gap-1 text-green-400 hover:text-green-600 font-medium'
                onClick={()=>setShowForm(true)}
                >
                    Add Food<IoMdAdd className='text-lg'/>
                </button>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="text-gray-300 border-b border-gray-700">
                    <tr>
                        <th className='py-2 px-4'>Food Name</th>
                        <th className='py-2 px-4'>Catogery</th>
                        <th className='py-2 px-4'>Images</th>
                        <th className='py-2 px-4'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index)=>(
                        <tr key={index} className="border-b border-gray-800 hover:bg-white/5">
                            <td className='py-2 px-4'>{food.name}</td>
                            <td className='py-2 px-4'>{food.catogory}</td>
                            <td className='py-2 px-4'> <img
                                src={food.images}
                                alt={food.name}
                                className="w-16 h-16 object-cover rounded-md mx-auto"
                            /></td>
                            <td className='py-2 px-4'>
                                <button className='text-blue-400 hover:text-blue-600 mx-2'>
                                    <FaEdit/>
                                </button>
                                <button className='text-red-400 hover:text-red-600 mx-2'>
                                    <FaTrash/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        {showForm &&(
                <FoodForm
                onClose={()=>setShowForm(false)}
                onSave={handleAddFood}
                />
            )}
        </>
    )
}