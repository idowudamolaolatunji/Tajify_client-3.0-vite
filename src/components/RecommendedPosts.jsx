
import React, { useEffect, useState } from 'react'
import BlogPost from './BlogPost'

function RecommendedPosts({ currPostId }) {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const recommendedPost = blogs?.filter(blog => blog?._id !== currPostId)?.slice(0, 2);

    useEffect(function() {
        async function fetchReommendedBlog() {
            try {
                setIsLoading(true);

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                if(data.status !== 'success') throw new Error(data.message);
                console.log(res, data);

                setBlogs(data.data.blogs);
                
            } catch(err) {
                console.log(err.message);
            } finally {
                setIsLoading(false)
            }
        }

        fetchReommendedBlog();
    }, [])

  return (
    <div className='recommended-container'>

        <p className='recommended-heading'>Recommended From Tajify</p>

        <div className="more-grid">
            {recommendedPost?.map(blog => {
                return <BlogPost key={blog?._id} post={blog} />
            })}
        </div>

        <hr className='hr'/>

    </div>
  )
}

export default RecommendedPosts
