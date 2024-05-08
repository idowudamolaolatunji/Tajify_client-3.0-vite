import React from 'react'
import Skeleton from 'react-loading-skeleton'

function VideoCardSkeleton() {
  return (
    <div>

            <Skeleton height={"20rem"} width={'100%'} baseColor="#eee" />
            <div className='blog-skel-mid'>
                <Skeleton circle={true} height={'4.8rem'} />
                <Skeleton height={"1rem"} width={'60%'} baseColor="#eee" />
            </div>
      
    </div>
  )
}

export default VideoCardSkeleton