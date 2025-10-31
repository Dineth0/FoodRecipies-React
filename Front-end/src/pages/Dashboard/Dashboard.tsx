import React, { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');

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
        <Card title="Total Foods" value={stats.totalFoods} icon="🍛" />
        <Card title="Total Recipies" value={stats.totalRecipies} icon="📜" />
        <Card title="Total Comments" value={stats.totalComments} icon="📝" />
        <Card title="Total Users" value={stats.totalUsers} icon="👨" />
      </div>

      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          {/* <h2 className="text-xl font-semibold">Current Loans</h2> */}
          <div className="flex space-x-3">
            <Tab label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <Tab label="Foods" active={activeTab === 'foods'} onClick={() => setActiveTab('foods')} />
            <Tab label="Recipies" active={activeTab === 'recipies'} onClick={() => setActiveTab('recipies')} />
            <Tab label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
            <Tab label="Comments" active={activeTab === 'comments'} onClick={() => setActiveTab('comments')} />
          </div>
        </div>

        {activeTab === 'home' && (
          <div className="overflow-x-auto">
           
          </div>
        )}

        {activeTab === 'foods' && (
          <div className="text-center text-gray-300 py-10">  tab content here...</div>
        )}
        {activeTab === 'users' && (
          <div className="text-center text-gray-300 py-10">Users tab content here...</div>
        )}
        {activeTab === 'comments' && (
          <div className="text-center text-gray-300 py-10">Comments tab content here...</div>
        )}
      </div>

      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 bg-blue-600 rounded-full backdrop-blur-md px-8 py-3 flex space-x-6">
        <NavButton label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavButton label="Foods" active={activeTab === 'foods'} onClick={() => setActiveTab('foods')} />
        <NavButton label="Recipies" active={activeTab === 'recipies'} onClick={() => setActiveTab('recipies')} />
        <NavButton label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
        <NavButton label="Comments" active={activeTab === 'comments'} onClick={() => setActiveTab('comments')} />
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="p-6 bg-white/10 rounded-xl text-center shadow-md">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm font-medium transition ${
        active ? 'bg-purple-600 text-white' : 'bg-white/10 hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  );
}

function NavButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs transition ${
        active ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-1">
        {label[0]}
      </div>
      {label}
    </button>
  );
}