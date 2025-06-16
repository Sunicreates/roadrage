import React from 'react';

export default function Feed({ posts, user, setPosts }) {
    const safePosts = posts || []; 

    return (
        <div className="flex-1 p-8">
            <h2 className="text-pink-500 text-center mb-8 font-mono text-4xl">
                POSTSSSSS.........
            </h2>
            
            <div className="max-w-4xl mx-auto">
                {safePosts.map((post, index) => (
                    <div 
                        key={index} 
                        className="border border-black rounded-3xl p-9 mb-8 shadow-md bg-white transition duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                    >
                        {/* Creator Info */}
                        <div className="flex items-center mb-6 ">
                            <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs">
                                    <img src={user?.photoURL} className='rounded-full'/>
                                </span>
                            </div>
                            <div className="border border-black rounded-full px-4 py-1">
                                <span className="text-sm font-medium">
                                    {user?.displayName || 'ANONYMOUS USER'}
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
                            <div className="w-[550px] h-[400px] rounded-lg overflow-hidden shadow-md">
                                {post.img ? (
                                    <img
                                        src={post.img}
                                        alt={post.caption}
                                        className="w-full h-full shadow-md object-contain"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          margin: 'auto',
                                          display: 'block'
                                        }}
                                      />
                                ) : (
                                    <div className="w-[400px] h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>

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

                        {/* Average Rating Display */}
                        <div className="border-2 border-black rounded-full p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <span className="text-pink-600 font-semibold">
                                        Average Rating: {post.averageRating ? post.averageRating.toFixed(1) : '0.0'}
                                    </span>
                                    <span className="text-gray-600">
                                        ({post.ratings ? post.ratings.length : 0} ratings)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}