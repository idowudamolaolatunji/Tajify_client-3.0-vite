import React from 'react'
import ComponentCard from './ComponentCard';
import MarketFigure from './MarketFigure';


function FeaturedMarketProduct() {
  return (
    <ComponentCard componentClassName={`featured__product`}>
        <div className="product-head">
            <h3>Featured Market Products</h3>
            <p>View More...</p>
        </div>
        <div className="products__card">
            <MarketFigure />
            <MarketFigure />
            <MarketFigure />
        </div>
    </ComponentCard>
  )
}

export default FeaturedMarketProduct
