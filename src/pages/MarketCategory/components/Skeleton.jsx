import React from 'react';

import CardAvatar from '../../../assets/images/market-slide/card-avatar.jpg'

function Skeleton() {
  return (
    <figure className='card--figure'>
        <img src={CardAvatar} alt="Product avatar" />

        <figcaption>
            <p className='card-loading--text'>Loading...</p>
        </figcaption>
    </figure>
  )
}

export default Skeleton
