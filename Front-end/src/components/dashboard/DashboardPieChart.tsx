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
    <div className="bg-white/10 p-6 rounded-lg h-[300px]">
        <h2 className="text-lg font-semibold mb-4">
            Recipe Status Distribution
        </h2>

        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label>
                        {data.map((_, index)=>(
                             <Cell key={index} fill={COLORS[index]} />
                        ))}
                </Pie>
                 <Tooltip />
  <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}
