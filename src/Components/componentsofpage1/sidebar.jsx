import React from 'react';

export default function Sidebar({ mode, setMode ,show}) {
    console.log('Sidebar render: show=', show, 'mode=', mode);
    return (
      <div className={`
        fixed top-20 left-0 h-full bg-gray-100 text-pink-500 font-bold p-4 flex flex-col transition-transform duration-300
        w-20 z-50
        ${show ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div onClick={()=>setMode('home')} className={`icon cursor-pointer hover:bg-gray-200 active:bg-gray-500 ${mode === 'home' ? 'active' : ''}`}>
          Home

        </div>
      <div
          className={ `icon cursor-pointer p-2 hover:bg-gray-200 active:bg-gray-500 ${mode === 'feed' ? 'active' : ''}`}
          onClick={() => setMode('feed')}
        >
          My Posts
        </div>
        <div
          className={`icon cursor-pointer p-2 hover:bg-gray-200 active:bg-gray-500 ${mode === 'create' ? 'active' : '' }`}
          onClick={() => setMode('create')}
        >
          Create 
        </div>
        <div
          className={`icon cursor-pointer p-2 hover:bg-gray-200 active:bg-gray-500 ${mode === 'rank' ? 'active' : '' }`}
          onClick={() => setMode('rank')}
        >
        Ranking
        </div>

      </div>
    );
  }
