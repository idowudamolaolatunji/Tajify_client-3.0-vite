import React, { useEffect, useState } from 'react'
import CategorySkeleton from './CategorySkeleton'
import CategoryCard from './CategoryCard';

function MarketCategory({ categories, isLoading }) {

  return (
    <section className='product--cards-section'>
        <div className="top--part category-top-part">
            <span className='cards-section-title'>Shop From Collections</span>
        </div>


        <div className='bottom--part'>
            {isLoading && (
                <CategorySkeleton />
            )}
            <div className="category--cards-grid">
                {categories?.length > 1 && categories?.map(category => (
                    <CategoryCard item={category} />
                ))}
            </div>
        </div>
      
    </section>
  )
}

export default MarketCategory
