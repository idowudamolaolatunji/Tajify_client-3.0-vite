import React from 'react'
import { Link } from 'react-router-dom'
import { numberConverter, truncateText } from '../../../utils/helper'

function Card({ item }) {
    return (
        <Link to={`/market/${item?.slug}`}>
            <figure className='card--figure'>
                <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/products/${item?.images[0]}`} alt={item?.name} />

                <figcaption>
                    <p className='card-figure-name'>{truncateText(item?.name, 4)}</p>
                    <p className='card-figure-price'>₦{numberConverter(item?.price)}</p>
                </figcaption>
            </figure>
        </Link>
    )
}

export default Card
