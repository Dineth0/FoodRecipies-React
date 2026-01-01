import { useEffect, useState } from "react"
import { getTotalStatusAndCompire } from "../../services/RecipeAPI"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ["#facc15", "#22c55e", "#ef4444"]
export default function DashboardPieChart() {
    const [data, setData] = useState<any[]>([])

    useEffect(()=>{
        const loadData = async ()=>{
            const response = await getTotalStatusAndCompire()
            console.log("Frontend Status Data:", response.data.statusData)
            setData(response.data.statusData)
           
        }
        loadData()

        const interval = setInterval(()=>{
            loadData()
        },5000)
        return () => clearInterval(interval)
    },[])
  return (
    <div className="bg-white/10 p-6 rounded-lg h-[350px] w-full min-w-[300px]">
    <h2 className="text-lg font-semibold mb-4 text-white">
        Recipe Status Distribution
    </h2>
    <div style={{ width: '100%', height: '250px' }}> 
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" 
                    cy="50%"
                    outerRadius={80}
                    isAnimationActive={false} 
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
</div>
  )
}
