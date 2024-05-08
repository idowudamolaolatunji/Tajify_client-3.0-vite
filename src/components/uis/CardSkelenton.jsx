import React from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkelenton() {
  return (
    <div className='card-skel'>
        <Skeleton style={{ width: '100&', height: '32rem', borderRadius: '1rem'}} baseColor="#eee" />
        <Skeleton style={{ width: '100&', height: '32rem', borderRadius: '1rem'}} baseColor="#eee" />
        <Skeleton style={{ width: '100&', height: '32rem', borderRadius: '1rem'}} baseColor="#eee" />
        <Skeleton style={{ width: '100&', height: '32rem', borderRadius: '1rem'}} baseColor="#eee" />
        <Skeleton style={{ width: '100&', height: '32rem', borderRadius: '1rem'}} baseColor="#eee" />
    </div>
  )
}

export default CardSkelenton;