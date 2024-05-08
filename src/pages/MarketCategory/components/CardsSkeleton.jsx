import React from 'react'
import Skeleton from './Skeleton'

function CardsSkeleton({ extra }) {
    return (
        <div className={`${extra ? 'product--cards-grid' : 'product--cards-flex'}`}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            
        </div>
    )
}

export default CardsSkeleton
