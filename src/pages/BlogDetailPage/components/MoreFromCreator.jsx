import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import BlogPost from '../../../components/BlogPost';

function MoreFromCreator({ creator, moreBlogs }) {

    const navigate = useNavigate();
    
    return (
        <div className='more-from-creator'>

            <p className='more-from-title'>More From {creator?.fullname || creator?.username}</p>

            <div className="more-grid">
                {moreBlogs?.length > 0 && moreBlogs?.map(blog => {
                    return <BlogPost key={blog?._id} post={blog} />
                })}
            </div>

            <hr className='hr'/>
    
            {/* {moreBlogs?.length > 4 && ( */}
            {moreBlogs?.length > 1 && (
                <>
                    <button className='more-from-btn' onClick={() => navigate('/profile')}>See more from {creator?.fullname || creator?.username}</button>

                    <hr className='hr'/>
                </>
            )}
        </div>
    )
}

export default MoreFromCreator
