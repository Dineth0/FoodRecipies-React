import { useEffect, useState, useRef } from "react";
import { getAllNotifications, markAsRead } from "../../services/NotifyAPI";
import { io } from 'socket.io-client';


interface NotificationItem{
     _id: string;
    recipeTitle: string;
    foodName: string;
    userName: string;
    createdAt: string;
    read: boolean;
}

const NotifyBell = () =>{
    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const[unReadCount, setUnReadCount] = useState(0)
    const[isOpen, setIsOpen] = useState(false)
    const socket = useRef<any>(null)

    useEffect(()=>{
        const fetchNotifications = async ()=>{
            try{
                const response = await getAllNotifications()
                setNotifications(response.data.data.notification)
                setUnReadCount(response.data.data.unReadNotify)
            }catch(error){
                console.error(error)
            }
        }
        fetchNotifications()

        socket.current = io("http://localhost:5000")

        socket.current.on("connect", ()=>{
            socket.current.emit("join_admin_room")
        })

        socket.current.on("New Pending Recipe", (payload:any) =>{
            const newNotification ={
                _id: payload.data.recipeId,
                recipeTitle: payload.data.recipeTitle,
                foodName: payload.data.foodName, 
                userName: payload.data.userName,
                createdAt: new Date().toISOString(),
                read: false
            }
            setNotifications((prev)=> [newNotification, ...prev])
            setUnReadCount((prev)=> prev + 1)
        })
        return () =>{
            socket.current.disconnect()
        }
    },[])

    const handleDropDown = async  () =>{
        setIsOpen(!isOpen)
        if(isOpen){
            setIsOpen(false)
            setNotifications([])
            return
        }
        setIsOpen(true)
        if( unReadCount > 0){
            try{
                await markAsRead()
                setUnReadCount(0)
            }catch(error){
                console.error(error)
            }
        }
    }



    return(
        <div className="relative">
            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
                onClick={handleDropDown}>
                    <span className="text-2xl">🔔</span>
                    {unReadCount > 0 &&(
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0A0A0A]">
                            {unReadCount}
                        </span>
                    )}
            </button>

            {isOpen &&(
                <div className="absolute right-0 mt-2 w-80 bg-[#8A784E] border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-700 font-semibold text-gray-200">
                        Notifications
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ?(
                            <div className="p-4 text-center text-gray-200 text-sm">
                                No Notifications
                            </div>
                        ):(
                            notifications.map((notify,index)=>(
                                <div 
                                    key={index}
                                    className={`p-3 border-b border-gray-700 hover:bg-white/5 transition duration-150 ${!notify.read ? 'bg-white/5' : ''}`}>
                                        <div className="border border-dashed border-gray-500 p-2 rounded text-sm text-gray-300">
                                            {notify.recipeTitle}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className='flex justify-between'>
                                                <span>Food:</span>
                                                <span className="text-white">{notify.foodName || "N/A"}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Submitted by:</span>
                                                <span className="text-white">{notify.userName}</span>
                                            </div>
                                            <div className='text-[10px] text-gray-500 text-right mt-1'>
                                               {new Date(notify.createdAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default NotifyBell