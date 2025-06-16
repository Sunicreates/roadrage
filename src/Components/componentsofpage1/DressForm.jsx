import React,{useState} from 'react';
import "../j.js/index.css";

function Blogform({onSubmit}){
 const [dressimage,setDress]=useState(null);
 const [caption,setcaption]=useState('');
 const [description,setDescription]=useState('');
 const [tags,setTags]=useState('');

 

const handlechange=(e)=>{

    const {name,files,value}=e.target;

    if(name=='inputfieldforimage'){
        setDress(files[0]);
    }else if(name=='inputfieldcaption'){
        setcaption(value);
    }else if(name=='inputfieldfordescription'){
         setDescription(value);
    }else if(name=='inputfieldfortags'){
        setTags(value);
    }
    
};

const handlesubmit=(e)=>{
    e.preventDefault();

    if (!dressimage || !caption || !description) {
      alert("Please fill in all required fields");
      return;
  }


    const newpost={
      postId:`dressimage_${Math.floor(Math.random() * 100000)}`,
      img:dressimage,
      description:description,
      tags:tags,
      caption:caption
    }
    if (typeof onSubmit === 'function') {
      onSubmit(newpost);
    }
    setDress(null);
    setcaption('');
    setDescription('');
    setTags('');
}



return(
     
    <div className='max-w-lg h-50 mx-auto bg-white-200 shadow-lg rounded-2xl p-6 m-10'>
    <form onSubmit={handlesubmit}>

    <div className="relative rounded mt-6">
    
      <div className='italic text-pink-300  flex items-start justify-start m-6'><h1 >You are currently creating a post  </h1></div>
      {dressimage &&
        <img
        src={URL.createObjectURL(dressimage)}
        alt="uploaded"
        className="w-80 h-30 rounded-md mb-4 mx-auto object-cover p-4 shadow-md"
        />
      }
      
      <label htmlFor="dressimage" className="cursor-pointer inline-block bg-pink-400 text-white italic w-100 h-12 flex items-center justify-center select-none shadow-md hover:bg-pink-500 transition-colors duration-300">
        Choose Pic
      </label>
      <input
        type="file"
        id="dressimage"
        name="inputfieldforimage"
        onChange={handlechange}
        className="absolute top-0 left-0 w-12 h-12 opacity-0 cursor-pointer"
      />
    </div>

    <div className="bg-white"></div>
    <label htmlFor='caption' className="block text-pink-700 font-semibold mb-1 mt-4">Caption</label>
    <input
    type="text"
    className="w-full p-3 border border-pink-300 rounded-lg bg-pink-100 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
    id="cationid"
    name="inputfieldcaption"
    value={caption}
    onChange={handlechange}
    placeholder="Enter caption"
    />

   <div className='bg-white'></div>
   <label htmlFor='description' className="block text-pink-700 font-semibold mb-1 mt-4">Description</label>
    <input
    type="text"
        
    className="w-full p-3 border border-pink-300 rounded-lg bg-pink-100 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
    id="descriptionid"
    name="inputfieldfordescription"
    value={description}
    onChange={handlechange}
    placeholder="Enter description"
    />

   <div  className='bg-white' ></div>
   <label htmlFor='tags' className="block text-pink-700 font-semibold mb-1 mt-4">Tags</label>
    <input
    type="text"
    className="w-full p-3 border border-pink-300 rounded-lg bg-pink-100 text-pink-900 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
    id="tags"
    name="inputfieldfortags"
    value={tags}
    onChange={handlechange}
    placeholder="Enter tags"
    />

    <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold mt-6 w-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl" type="submit">Post</button>
    

    </form>
    </div>
);
}
export default Blogform;

