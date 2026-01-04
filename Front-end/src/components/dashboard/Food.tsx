import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoMdAdd } from "react-icons/io";
import FoodForm from "../dashboard/FoodForm"
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDisPatch, RootState } from '../../redux/store';
import { deleteFoodAction, fetchAllFoods, setSelectedFood, type Food } from '../../redux/slices/foodSlice';

type FoodItem = Food


export  default function Foods(){
    const [page, setPage] = useState(1)
    
    const [showForm,setShowForm] = useState(false)
    const dispatch = useDispatch<AppDisPatch>();
    const { foods, loading, totalPages } = useSelector((state: RootState) => state.food);

    useEffect(() =>{
         dispatch(fetchAllFoods({ page, limit: 3 }));
    },[dispatch, page])

    const handleSavedFood = () =>{
        dispatch(fetchAllFoods({ page, limit: 3 }));
        setShowForm(false);
    }
    const handleEditFood = (food:FoodItem)=>{
        dispatch(setSelectedFood(food))
        setShowForm(true)
    }
    const handleAddClick = () =>{
        dispatch(setSelectedFood(null))
        setShowForm(true)
    }
    const handleCloseForm = () =>{
        dispatch(setSelectedFood(null))
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
                    dispatch(deleteFoodAction(foodDelete._id));
                    

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
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Foods</h2>
            <div className='flex justify-end mb-4'>
                <button className='flex items-center gap-1 text-green-400 hover:text-green-600 font-medium'
                onClick={handleAddClick}
                >
                    Add Food<IoMdAdd className='text-lg'/>
                </button>
            </div>
            {loading && <p className="text-white">Loading...</p>}
            <div className='w-full overflow-x-auto'>
                <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px]">
                    <thead className="uppercase tracking-wider  bg-black/70 backdrop-blur-md border-b border-white/20">
                        <tr>
                            <th className='py-2 px-4 w-[15%]'>Food Name</th>
                            <th className='py-2 px-4 w-[10%]'>Catogery</th>
                            <th className="py-2 px-4 w-[10%]">Cuisine</th>
                            <th className='py-2 px-4 w-[30%]'>Description</th>
                            <th className='py-2 px-4 w-[25%] text-center '>Images</th>
                            <th className='py-2 px-4 w-[10%] text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food: FoodItem, index:number)=>(
                            <tr key={index} className="border-b border-gray-800 hover:bg-black/25">
                                <td className='py-2 px-4'>{food.name}</td>
                                <td className='py-2 px-4'>{food.category}</td>
                                <td className='py-2 px-4'>{food.cuisine}</td>
                                <td className='py-2 px-4'>{food.description}</td>

                                <td className="py-2 px-4 flex gap-2 justify-center">
                                    {food.images && food.images.length > 0 ? (
                                        food.images.map((imgUrl:string, idx:number) => (
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

            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
                    page === 1
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                >
                Prev
                </button>

                <span className="text-gray-600 text-sm">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
                </span>

                <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
                    page === totalPages
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
                >
                Next
                </button>
            </div>
          
            
        </div>
        {showForm &&(
                <FoodForm
                onClose={handleCloseForm}
                onSave={handleSavedFood}
                
                />
            )}
        </>
    )
}