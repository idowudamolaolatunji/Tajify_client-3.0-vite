
import React from 'react'
import { Link } from 'react-router-dom';

import Card from './Card';
import CardsSkeleton from './CardsSkeleton';

function ProductCards({ title, isLoading, products }) {

    return (
        <section className='product--cards-section'>
            <div className="top--part">
                <span className='cards-section-title'>{title}</span>
                <Link className='see-all'>See all</Link>
            </div>

            <div className='bottom--part'>
                {isLoading && (
                    <CardsSkeleton />
                )}
                <div className="product--cards-flex">
                    {products?.length > 0 && products?.map(product => (
                        <Card item={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductCards;
