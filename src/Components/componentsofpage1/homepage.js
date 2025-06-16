import React, { useState, useEffect } from 'react';
import "../j.js/index.css";

function Homepage({ user }) {
  const [randomPosts, setRandomPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const posts = await response.json();
        
        // Shuffle the posts array to get random posts
        const shuffled = [...posts].sort(() => 0.5 - Math.random());
        // Get first 5 posts (or less if there are fewer posts)
        const selected = shuffled.slice(0, 5);
        setRandomPosts(selected);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random posts:", error);
        setLoading(false);
      }
    };

    fetchRandomPosts();
    // Refresh every 5 minutes
    const intervalId = setInterval(fetchRandomPosts, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleRating = async (postId, rating) => {
    if (!user) {
      alert("Please log in to rate posts");
      return;
    }

    try {
      console.log("fuck this ass:", {
        uid: user.uid,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        useremail: user.useremail
      });
      const response = await fetch("http://localhost:5000/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId: user.uid,
          rating,
          displayName: user?.displayName || user?.username, // Add this
          email: user.email 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit rating");
      }

      // Refresh posts after rating
      const postsResponse = await fetch("http://localhost:5000/posts");
      const postsData = await postsResponse.json();
      const shuffled = [...postsData].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setRandomPosts(selected);

    } catch (error) {
      console.error("Error submitting rating:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading random posts...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-pink-500 text-center mb-8 font-mono text-4xl">
        Random Posts
      </h2>
      
      {randomPosts.length === 0 ? (
        <div className="text-center py-8">
          <p>No posts available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {randomPosts.map((post) => (
            <div 
              key={post.postId} 
              className="border border-black rounded-3xl p-9 mb-8 shadow-md bg-white transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              {/* Creator Info */}
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs">
                    <img src={post.userphoto} className='rounded-full'/>
                  </span>
                </div>
                <div className="border border-black rounded-full px-4 py-1">
                  <span className="text-sm font-medium">
                    {post.displayName || 'ANONYMOUS USER'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-row gap-6 items-center mb-6">
                {/* Caption Box */}
                <div className="shadow-md rounded-xl p-4 w-[200px] bg-pink-50">
                  <h3 className="text-pink-700 text-lg font-semibold">
                    {post.caption}
                  </h3>
                </div>

                {/* Image Box */}
                <div className="w-[550px] h-[400px] rounded-lg overflow-hidden relative">
                  {post.img ? (
                    <img
                      src={post.img}
                      alt={post.caption}
                      className="w-full h-full object-contain"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        margin: 'auto',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.split(',').map((tag, i) => (
                  <span 
                    key={i} 
                    className="bg-pink-200 text-rose-900 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>

              {/* Rating System */}
              <div className="border-2 border-black rounded-full p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-evenly space-x-2 w-full">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          console.log("Rating clicked:", i + 1); // Add this debug log
                          handleRating(post.postId, i + 1);}}
                        className="w-8 h-8 border border-pink-300 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-pink-500 hover:text-white"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Homepage;