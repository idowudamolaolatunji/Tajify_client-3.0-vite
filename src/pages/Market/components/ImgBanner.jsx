import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

function ImgBanner({ isLoading, img }) {
  return (
    <div className='image--banner product--cards-section'>
        {isLoading ? (
            <Skeleton height={"100%"} width={'100%'} baseColor="#eee" />
        ) : (
            // <img src={img} alt={img} />
            <img src={'https://res.cloudinary.com/dy3bwvkeb/image/upload/v1714146047/Untitled_2_icjqib.png'} alt={img} />
        )}
    </div>
  )
}

export default ImgBanner
