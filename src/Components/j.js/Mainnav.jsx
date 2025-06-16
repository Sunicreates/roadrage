import React, { useEffect } from 'react';
import '../j.js/index.css';
import {useState} from 'react';

export default function Navbar({togglesidebar,user}){
  const imageurl = user?.photoURL || "/Cookie Monster.png";
  const username= user?.displayName || `User${Math.floor(Math.random() * 10000)}`

  
    return (
<div className=" fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white to-gray-100 p-4 flex items-center text-3xl font-extrabold uppercase tracking-widest shadow-lg border-b-2 border-pink-400">
  <button
        className=" text-pink-500 text-3xl focus:outline-none mr-4"
        onClick={togglesidebar}
        aria-label="Toggle menu"
      >
        ☰
      </button>
  <h1 className="text-pink-500 italic drop-shadow-md">F A S H I O N - C I T Y</h1>
 

  <div className="w-10 h-10 border-2 border-pink-500 rounded-full ml-auto flex items-center justify-center">
    
    
 <img
  
  src={imageurl }
 
  className="rounded-full"
  />
  </div>
  
  <h3 className="text-[9px] text-pink-500">{username}</h3>

</div>
    )}