import { useEffect, useState } from "react"
import { getRecipeGrowth } from "../../services/RecipeAPI"
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

export default function RecipesLineChart() {
    const [data, setData] = useState<any[]>([])
    useEffect(()=>{
        const loadData = async () =>{
            const res = await getRecipeGrowth()
            setData(res.data.data)
        }
        loadData()
        const interval = setInterval(()=>{
            loadData()
        },5000)
        return () => clearInterval(interval)
    },[])
  return (
    <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
            Recipes Growth
        </h2>

        <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
                <XAxis dataKey="day" stroke="#ccc" interval={0} tick={{ fill: '#ccc', fontSize: 12 }}/>
                <YAxis stroke="#ccc"/>
                <Tooltip/>
                <Line
                    type="monotone"
                    dataKey="recipes"
                    stroke="#facc15"
                    strokeWidth={3}
                    dot={{r:4}}/>
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
