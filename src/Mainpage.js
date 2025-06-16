import React,{ useState } from 'react';
import Navbar from './Components/j.js/Mainnav';
import Feed from './Components/componentsofpage1/feed';
import Sidebar from './Components/componentsofpage1/sidebar';
import AApp from './Components/componentsofpage1/post';
import Blogform from './Components/componentsofpage1/DressForm';
import Homepage from './Components/componentsofpage1/homepage';
import { useEffect } from 'react';




function M1({user}){

const [mode,setMode]=useState("home");
const [sidebarvisible,setSidebarvisible]=useState(false);
const [Posts, setPosts] = useState("feed");

const togglesidebar=()=> {   
    setSidebarvisible(!sidebarvisible);
}

const handlechange=(newMode)=>{
  if (mode === newMode) {
    setMode('home');
  } else {
    setMode(newMode);
  }
  setSidebarvisible(false);
}
const handleSubmit = async (newPost) => {
  if (!user) {
    console.error("User is not logged in.");
    return;
  }
  const formData = new FormData();
    
    // Add image file
    formData.append('image', newPost.img);
    
    // Add user data with all required fields
    const userData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Anonymous User',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified || false,
        isAnonymous: user.isAnonymous || true,
        providerData: user.providerData || [],
        stsTokenManager: user.stsTokenManager || {},
        lastLoginAt: user.lastLoginAt || new Date().toISOString(),
        apiKey: user.apiKey || '',
        appName: user.appName || 'roadrage'
    };
    formData.append('user', JSON.stringify(userData));
    formData.append('posts', JSON.stringify([{
        postId: newPost.postId,
        description: newPost.description,
        tags: newPost.tags,
        caption: newPost.caption
    }]));

    try {
      console.log('Sending data:', {
          user: userData,
          post: {
              postId: newPost.postId,
              description: newPost.description,
              tags: newPost.tags,
              caption: newPost.caption
          }
      });

      const response = await fetch("http://localhost:5000/post", {
          method: "POST",
          body: formData
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create post");
      }

      const result = await response.json();
      setPosts(prevPosts => [...result.data, ...prevPosts]);
  } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post: " + error.message);
  }
};
// Add after the useState declarations
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, []);

    return(
        <div className="bg-gradient-to-b from-white to-gray-100 w-screen h-screen flex flex-col hover:bg-gray-100">
        <Navbar togglesidebar={togglesidebar} user={user} />
        <Sidebar mode={mode} setMode={handlechange} show={sidebarvisible}/>
       
        
        
         <main className={`hover:bg-gray-100 transition-all duration-300 ${sidebarvisible ? 'ml-20' : 'ml-0'}pt-20`}>
            {mode==='create' && <Blogform onSubmit={handleSubmit}/>}
            {mode==='feed' && (
  Posts.length > 0 
    ? <Feed posts={Posts} setPosts={setPosts} user={user} />
    : <div className="text-center py-10 text-gray-500">Ur posts appear here</div>
)}
            {mode ==='rank' && <AApp user={user} setPosts={setPosts}/>}
            {mode==='home' && <Homepage user={user}/>}

        </main>
     </div>
    );
};



export default M1;