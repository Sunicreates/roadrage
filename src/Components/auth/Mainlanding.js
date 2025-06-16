import React from 'react';
import { signInWithGoogle,db } from './firebase';
import { doc, setDoc ,getDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

export default function LandingPage({setUser}) {
  
  const navigate=useNavigate()

  const handleclick= async ()=> {
    try{
    const result=await signInWithGoogle();
    const user=result.user;
    console.log("User after login:", user);
    setUser(user);

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    

if(!userSnap.exists()){
    await setDoc(doc(db,"users",user.uid),{
     uid:user.uid,
      useremail:user.email ?? null,
      username:user.displayName ?? null,
      userphoto:user.photoURL ?? null,
      totalLikes: 0,
      totalPosts: 0
    })
    
  
    console.log("Signed in as ",user)
  }else{
    console.log("user already exists",user)
    navigate("/dashboard")
    
  }
    ;
    
    
    
    }catch(error){
      console.error(error)
    }
  

  };




  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center px-6 py-10">
      
      <div className="w-full max-w-5xl flex justify-between items-center mb-10">
        <div className=''>
  <div className="text-3xl font-extrabold text-rose-700 w-[100px] h-[100px] flex items-center justify-center absolute left-[765px] top-[90px] ">
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</div>

        <div className="text-6xl font-extrabold text-rose-700 absolute left-[300px] top-[150px] ">F A S H I O N  </div>
        <div className="text-6xl font-extrabold text-rose-700 absolute left-[300px] top-[210px] ">C I T Y </div>
        </div>

        <div className="text-md font-semibold text-rose-600 x-100 y-100 absolute left-[900px] top-[200px]">
            <img
            src="\Screenshot 2025-06-04 214850.png"
            className="relative left-[10px] top-[5px] rounded w-[400px] h-[400px] shadow-md"
        /></div>
      </div>
      <div className='absolute left-[300px] top-[350px]'>
 <h1 className="text-3xl font-bold text-rose-900">Welcome to a Dress Blog App !</h1>
        <p className="text-xlll text-rose-700">
          Share your style, rate outfits, get feedback.

        </p>
      </div>
      
       

    
        <div className="w-10 border-b-5 border-rose-500 mb-4" />

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={handleclick} className="bg-white text-rose-700 font-medium px-6 py-3 absolute left-[300px] top-[550px] rounded-full shadow-md hover:bg-rose-100 transition duration-200">
            Sign Up with Google
          </button>
          <button onClick={handleclick} className="bg-white text-rose-700 font-medium px-6 py-3 absolute left-[525px] top-[550px] rounded-full shadow-md hover:bg-rose-100 transition duration-200">
            Login with Google
          </button>
        </div>

      </div>
      
    
  );
}
