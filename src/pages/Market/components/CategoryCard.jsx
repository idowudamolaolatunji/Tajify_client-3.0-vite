import React from 'react'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ item }) {
    const navigate = useNavigate();

    return (
        <figure className='category--figure' onClick={() => navigate(`/market/category/${item?.slug}/${item?.categoryName}`)}>
            <img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/products/${item?.categoryImage}`} alt="" />

            <figcaption>
                <p>{item?.categoryName}</p>
            </figcaption>
        </figure>
    )
}

export default CategoryCard
