import React from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

function BlogCardSkeleton() {
    return (
        <div className='blog-card-skel'>
            <Skeleton height={"20rem"} width={'100%'} baseColor="#eee" />
            <div className='blog-skel-mid'>
                <Skeleton circle={true} height={'2.8rem'} />
                <Skeleton height={"1rem"} width={'70%'} baseColor="#eee" />
            </div>
            <div className="blog-skel-end">
                <Skeleton height={"1rem"} width={'100%'} baseColor="#eee" />
                <Skeleton height={"1rem"} width={'100%'} baseColor="#eee" />
                <Skeleton height={"1rem"} width={'100%'} baseColor="#eee" />
                <Skeleton height={"1rem"} width={'100%'} baseColor="#eee" />

            </div>
        </div>
    )
}

export default BlogCardSkeleton
