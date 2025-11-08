import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoMdAdd } from "react-icons/io";
import FoodForm from "../dashboard/FoodForm"
import { deleteFood, getAllFoods } from '../../services/FoodAPI';
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';

interface FoodItem{
    _id:string
    name:string
    category:string
    cuisine:string
    description:string
    images:string[]
}


export  default function Foods(){

    const [foods,setFoods] =useState<FoodItem[]>([])
    const [showForm,setShowForm] = useState(false)
    const [selectedFood, setSeletedFood] = useState<FoodItem | null>(null)

    useEffect(() =>{
        const fetchFoods = async () =>{
            try{
                const response = await getAllFoods()
                setFoods(response.data.data.foods)
            }catch(error){
                console.error(error)
                showErrorAlert('error', "Can not load data")
            }
        }
        fetchFoods()
    },[])

    const handleSavedFood = (savedFood: FoodItem) =>{
        if(savedFood._id){
            setFoods(prevFoods =>prevFoods.map(food=>
                food._id === savedFood._id ? savedFood : food
            ))
        }else{
            setFoods(prevFoods =>[
               ...prevFoods,
               {...savedFood, _id: savedFood._id || Date.now().toString()}
            ])
        }
        setSeletedFood(null)
        setShowForm(false)
    }
    const handleEditFood = (food:FoodItem)=>{
        setSeletedFood(food)
        setShowForm(true)
    }
    const handleAddClick = () =>{
        setSeletedFood(null)
        setShowForm(true)
    }
    const handleCloseForm = () =>{
        setSeletedFood(null)
        setShowForm(false)
    }

    const handleDelete = (foodDelete : FoodItem) =>{
        showConfirmDialog(
            'Are you sure?',
            `${foodDelete.name} Do you want to delete? `,
            'Yes, Delete id!'
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    await deleteFood(foodDelete._id)
                    setFoods(prevFoods =>
                        prevFoods.filter(food => food._id !== foodDelete._id)
                    )

                    showSuccessAlert('Deleted' ,`${foodDelete.name} has been Deleted`)
                }catch(error){
                    console.error(error)
                    showErrorAlert('error', 'Faild to delete')
                }
            }
        })
    }

    return(
        <>
        <div className="text-center text-gray-300 py-10">
            <div className='flex justify-end mb-4'>
                <button className='flex items-center gap-1 text-green-400 hover:text-green-600 font-medium'
                onClick={handleAddClick}
                >
                    Add Food<IoMdAdd className='text-lg'/>
                </button>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="text-gray-300 border-b border-gray-700">
                    <tr>
                        <th className='py-2 px-4'>Food Name</th>
                        <th className='py-2 px-4'>Catogery</th>
                         <th className="py-2 px-4">Cuisine</th>
                         <th className='py-2 px-4'>Description</th>
                        <th className='py-2 px-4'>Images</th>
                        <th className='py-2 px-4'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index)=>(
                        <tr key={index} className="border-b border-gray-800 hover:bg-white/5">
                            <td className='py-2 px-4'>{food.name}</td>
                            <td className='py-2 px-4'>{food.category}</td>
                            <td className='py-2 px-4'>{food.cuisine}</td>
                            <td className='py-2 px-4'>{food.description}</td>

                            <td className="py-2 px-4 flex gap-2 justify-center">
                                {food.images && food.images.length > 0 ? (
                                    food.images.map((imgUrl, idx) => (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`${food.name} ${idx + 1}`}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    ))
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            
                            <td className='py-2 px-4'>
                                <button className='text-blue-400 hover:text-blue-600 mx-2'
                                 onClick={() =>handleEditFood(food)}>
                                    <FaEdit/>
                                </button>
                                <button className='text-red-400 hover:text-red-600 mx-2'
                                onClick={()=>handleDelete(food)}>
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
                onClose={handleCloseForm}
                onSave={handleSavedFood}
                selectedFood = {selectedFood}
                />
            )}
        </>
    )
}