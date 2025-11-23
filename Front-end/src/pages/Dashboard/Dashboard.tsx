import  { useState } from 'react';
import StatsCard from '../../components/dashboard/StatsCard';
import Tab from '../../components/dashboard/Tab'
import Foods from '../../components/dashboard/Food';
import Recipie from '../../components/dashboard/Recipe';
import User from '../../components/dashboard/User';
import Comment from '../../components/dashboard/Comments';
import NavButton from '../../components/dashboard/NavButton';

type TabType = "home" | "foods" | "recipies" | "users" | "comments"

// interface Stats {
//   totalFoods = number
//   totalRecipies: number
//   totalComments: number
//   totalUsers: number
// }
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const stats = {
    totalFoods: 30,
    totalRecipies: 30,
    totalComments: 30,
    totalUsers: 3,
  };


  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Foods And Recipies</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Foods" value={stats.totalFoods} icon="🍛" />
        <StatsCard title="Total Recipies" value={stats.totalRecipies} icon="📜" />
        <StatsCard title="Total Comments" value={stats.totalComments} icon="📝" />
        <StatsCard title="Total Users" value={stats.totalUsers} icon="👨" />
      </div>

      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            {(["home","foods","recipies","users","comments"]as TabType[]).map((tab)=>(
              <Tab
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              active={activeTab === tab}
              onClick={() =>setActiveTab(tab)}
              >
              </Tab>
            ))}
          </div>
        </div>

        {activeTab === 'home' && (
                    <div className="text-center text-gray-300 py-10">Welcome to the Dashboard 👋</div>

        )}

        {activeTab === 'foods' && <Foods/>}
        {activeTab === 'recipies' && <Recipie/>}
        {activeTab === 'users' && <User/>}
        {activeTab === 'comments' && <Comment/>}

      </div>

      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 bg-blue-600 rounded-full backdrop-blur-md px-8 py-3 flex space-x-6">
        {(["home","foods","recipies","users","comments"]as TabType[]).map((tab)=>(
              <NavButton
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              active={activeTab === tab}
              onClick={() =>setActiveTab(tab)}
              >
              </NavButton>
            ))}
      </div>
    </div>
  );
}


